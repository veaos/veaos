import Router from 'express-promise-router';
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
} from '../controllers/comments.controller';

export const commentsRoutes = Router();

commentsRoutes.get('/post/:postId', getComments);
commentsRoutes.post('/:postId', createComment);
commentsRoutes.put('/:commentId', editComment);
commentsRoutes.delete('/:commentId', deleteComment);
