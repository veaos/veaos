import { useMutation } from 'react-query';
import { Request } from '../utils/request';

export const useEditPost = ({ postId }) =>
  useMutation((data) =>
    Request(`/posts/${postId}`, {
      method: 'PUT',
      data,
    })
  );
