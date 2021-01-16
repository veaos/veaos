import _ from 'lodash';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { Request } from '../utils/request';
import { useDeletePost } from './post.actions';

const questionQueryKey = 'questions';

export const useGetQuestions = () =>
  useQuery([questionQueryKey], () => Request('/posts'));

export const useGetInfiniteQuestions = ({ perPage }) =>
  useInfiniteQuery(
    [questionQueryKey],
    ({ pageParam = 1 }) =>
      Request('/posts', {
        query: {
          skip: (pageParam - 1) * perPage,
          limit: perPage,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) =>
        _.flatten(allPages).length / perPage + 1,
      getPreviousPageParam: (firstPage, allPages) =>
        _.flatten(allPages).length / perPage - 1,
    }
  );

export const useGetQuestion = ({ postId }) =>
  useQuery([questionQueryKey, { postId }], () =>
    Request(`/posts/byId/${postId}`)
  );

export const useCreateQuestion = () =>
  useMutation([questionQueryKey], (data) =>
    Request('/posts', {
      method: 'POST',
      data,
    })
  );

export const useLikeQuestion = ({ postId }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [questionQueryKey, { postId }],
    () =>
      Request(`/posts/${postId}/like`, {
        method: 'POST',
      }),
    {
      onMutate: (liked: boolean) => {
        const updatePost = (post) => {
          post.computed.likes += liked ? -1 : 1;
          post.liked = !liked;
        };

        let post: any = queryClient.getQueryData([
          questionQueryKey,
          { postId },
        ]);

        if (post) {
          updatePost(post);
          queryClient.setQueryData([questionQueryKey, { postId }], post);
        }

        const posts: any = queryClient.getQueryData([questionQueryKey]);
        post = posts.find(({ _id }) => _id === postId);

        if (post) {
          updatePost(post);
          queryClient.setQueryData([questionQueryKey], posts);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries([questionQueryKey]);
        queryClient.invalidateQueries([questionQueryKey, { postId }]);
      },
    }
  );
};

export const useDeleteQuestion = ({ postId }) => {
  const queryClient = useQueryClient();

  return useDeletePost(
    { postId },
    {
      onMutate: () => {
        const questions: any[] = queryClient.getQueryData([questionQueryKey]);

        if (Array.isArray(questions)) {
          queryClient.setQueryData(
            [questionQueryKey],
            questions?.filter(({ _id }) => _id !== postId)
          );
        }

        queryClient.setQueryData([questionQueryKey, { postId }], undefined);
      },
      onSuccess: () => {
        const questions: any[] = queryClient.getQueryData([questionQueryKey]);

        if (
          Array.isArray(questions) &&
          questions?.find(({ _id }) => _id !== postId)
        ) {
          queryClient.invalidateQueries([questionQueryKey]);
        }

        if (queryClient.getQueryData([questionQueryKey, { postId }])) {
          queryClient.invalidateQueries([questionQueryKey, { postId }]);
        }
      },
    }
  );
};
