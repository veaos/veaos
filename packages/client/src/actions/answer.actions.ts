import { useMutation, useQuery, useQueryClient } from 'react-query';
import ObjectID from 'bson-objectid';
import { Request } from '../utils/request';
import { useAuth } from '../context/AuthContext';
import { useDeletePost } from './post.actions';

const answerQueryKey = 'answers';

export const useCreateAnswer = ({ questionId }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<any>(
    [answerQueryKey, { questionId }],
    (data) =>
      Request(`/posts/${questionId}`, {
        method: 'POST',
        data,
      }),
    {
      onMutate: (data: any) => {
        const optimisticPost = {
          ...data,
          body: 'cool',
          _id: new ObjectID().toHexString(),
          computed: {
            likes: 0,
          },
          createdAt: new Date(),
          createdBy: user,
        };

        queryClient.setQueryData<any[]>(
          [answerQueryKey, { questionId }],
          (old) => [...old, optimisticPost]
        );

        return { optimisticPost };
      },
      onSuccess: (result, variables, context: any) => {
        queryClient.setQueryData<any[]>(
          [answerQueryKey, { questionId }],
          (old: any) =>
            old.map((post) =>
              post._id === context.optimisticPost._id ? result : post
            )
        );
      },
    }
  );
};

export const useGetAnswers = ({ questionId }) =>
  useQuery([answerQueryKey, { questionId }], () =>
    Request(`/posts/${questionId}`)
  );

export const useLikeAnswer = ({ answerId, questionId }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [answerQueryKey, { questionId }],
    () =>
      Request(`/posts/${answerId}/like`, {
        method: 'POST',
      }),
    {
      onMutate: (liked: boolean) => {
        const updatePost = (post) => {
          post.computed.likes += liked ? -1 : 1;
          post.liked = !liked;
        };

        const posts: any = queryClient.getQueryData([
          answerQueryKey,
          { questionId },
        ]);

        const post = posts.find(({ _id }) => _id === answerId);

        if (post) {
          updatePost(post);
          queryClient.setQueryData([answerQueryKey, { questionId }], posts);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries([answerQueryKey, { questionId }]);
      },
    }
  );
};

export const useDeleteAnswer = ({ questionId, postId }) => {
  const queryClient = useQueryClient();

  return useDeletePost(
    { postId },
    {
      onMutate: () => {
        const answers: any[] = queryClient.getQueryData([
          answerQueryKey,
          { questionId },
        ]);

        queryClient.setQueryData(
          [answerQueryKey, { questionId }],
          answers?.filter(({ _id }) => _id !== postId)
        );
      },
      onSuccess: () =>
        queryClient.invalidateQueries([answerQueryKey, { questionId }]),
    }
  );
};
