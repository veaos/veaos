import * as express from 'express';

import {
  createPost,
  deletePost,
  editPost,
  getPostByID,
  getPosts,
  likePost,
} from '../controllers/posts.controller';

export const postsRoutes = express.Router();

postsRoutes.get('/', getPosts);
postsRoutes.get('/:postId', getPosts);
postsRoutes.put('/:postId', editPost);
postsRoutes.delete('/:postId', deletePost);
postsRoutes.post('/:postId/like', likePost);
postsRoutes.get('/byId/:postId', getPostByID);
postsRoutes.post('/', createPost);
postsRoutes.post('/:postId', createPost);
