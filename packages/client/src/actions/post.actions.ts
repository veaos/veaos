import { useMutation, useQuery } from 'react-query';
import { Request } from '../utils/request';

export const postQueryKey = 'posts';

export const useEditPost = ({ postId }) =>
  useMutation([postQueryKey, { postId }], (data) =>
    Request(`/posts/${postId}`, {
      method: 'PUT',
      data,
    })
  );

export const useGetPost = ({ postId }) =>
  useQuery([postQueryKey, { postId }], () => Request(`/posts/byId/${postId}`));

export const useDeletePost = ({ postId }, options?) =>
  useMutation(
    async () => Request(`/posts/${postId}`, { method: 'DELETE' }),
    options
  );
