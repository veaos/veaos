import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Request } from '../utils/request';
import ObjectID from 'bson-objectid';
import { useAuth } from '../context/AuthContext';

const commentsQueryKey = 'comments';

export const useCreateComment = ({ postId }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation(
    [commentsQueryKey, { postId }],
    (data) =>
      Request(`/comments/${postId}`, {
        method: 'POST',
        data,
      }),
    {
      onMutate: (data: any) => {
        const optimisticComment = {
          ...data,
          _id: new ObjectID().toHexString(),
          createdAt: new Date(),
          createdBy: user,
        };

        queryClient.setQueryData([commentsQueryKey, { postId }], (old: any) => [
          ...old,
          optimisticComment,
        ]);

        return { optimisticComment };
      },
      onSuccess: (result, variables, context: any) => {
        queryClient.setQueryData<any[]>(
          [commentsQueryKey, { postId }],
          (old: any) =>
            old.map((comment) =>
              comment._id === context.optimisticComment._id ? result : comment
            )
        );
      },
    }
  );
};

export const useGetComments = ({ postId }) =>
  useQuery([commentsQueryKey, { postId }], () =>
    Request(`/comments/post/${postId}`)
  );

export const useDeleteComment = ({ postId }) => {
  const queryClient = useQueryClient();

  return useMutation(
    [commentsQueryKey, { postId }],
    ({ commentId }: any) =>
      Request(`/comments/${commentId}`, {
        method: 'DELETE',
      }),
    {
      onMutate: ({ commentId }: any) => {
        const comments: any[] = queryClient.getQueryData([
          commentsQueryKey,
          { postId },
        ]);

        queryClient.setQueryData(
          [commentsQueryKey, { postId }],
          comments?.filter(({ _id }) => _id !== commentId)
        );
      },
      onSuccess: () =>
        queryClient.invalidateQueries([commentsQueryKey, { postId }]),
    }
  );
};

export const useUpdateComment = ({ postId }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ commentId, updatedData }: any) =>
      Request(`/comments/${commentId}`, {
        method: 'PUT',
        data: updatedData,
      }),
    {
      onMutate: ({ commentId, updatedData }) => {
        queryClient.setQueryData([commentsQueryKey, { postId }], (old: any[]) =>
          old?.map((comment) =>
            comment._id === commentId ? { ...comment, ...updatedData } : comment
          )
        );
      },
      onSuccess: (result, { commentId }) => {
        queryClient.setQueryData([commentsQueryKey, { postId }], (old: any[]) =>
          old?.map((comment) => (comment._id === commentId ? result : comment))
        );
      },
    }
  );
};
