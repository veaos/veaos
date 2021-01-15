import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Request } from '../utils/request';

const queryKey = 'questions';

export const useGetQuestions = () =>
  useQuery([queryKey], () => Request('/posts'));

export const useGetQuestion = ({ postId }) =>
  useQuery([queryKey, { postId }], () => Request(`/posts/byId/${postId}`));

export const useCreateQuestion = () =>
  useMutation([queryKey], (data) =>
    Request('/posts', {
      method: 'POST',
      data,
    })
  );

export const useLikeQuestion = ({ postId }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [queryKey, { postId }],
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

        let post: any = queryClient.getQueryData([queryKey, { postId }]);

        if (post) {
          updatePost(post);
          queryClient.setQueryData([queryKey, { postId }], post);
        }

        const posts: any = queryClient.getQueryData([queryKey]);
        post = posts.find(({ _id }) => _id === postId);

        if (post) {
          updatePost(post);
          queryClient.setQueryData([queryKey], posts);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries([queryKey]);
        queryClient.invalidateQueries([queryKey, { postId }]);
      },
    }
  );
};
