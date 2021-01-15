import { useMutation, useQuery, useQueryClient } from 'react-query';
import ObjectID from 'bson-objectid';
import { Request } from '../utils/request';
import { useAuth } from '../context/AuthContext';

const queryKey = 'answers';

export const useCreateAnswer = ({ questionId }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<any>(
    [queryKey, { questionId }],
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

        queryClient.setQueryData<any[]>([queryKey, { questionId }], (old) => [
          ...old,
          optimisticPost,
        ]);

        return { optimisticPost };
      },
      onSuccess: (result, variables, context: any) => {
        queryClient.setQueryData<any[]>(
          [queryKey, { questionId }],
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
  useQuery([queryKey, { questionId }], () => Request(`/posts/${questionId}`));

export const useLikeAnswer = ({ answerId, questionId }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [queryKey, { questionId }],
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

        const posts: any = queryClient.getQueryData([queryKey, { questionId }]);

        const post = posts.find(({ _id }) => _id === answerId);

        if (post) {
          updatePost(post);
          queryClient.setQueryData([queryKey, { questionId }], posts);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries([queryKey, { questionId }]);
      },
    }
  );
};
