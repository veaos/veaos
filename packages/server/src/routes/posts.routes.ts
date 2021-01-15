import * as express from 'express';

import {
  createPost,
  editPost,
  getPostByID,
  getPosts,
  likePost,
} from '../controllers/posts.controller';

export const postsRoutes = express.Router();

postsRoutes.get('/', getPosts);
postsRoutes.get('/:postId', getPosts);
postsRoutes.put('/:postId', editPost);
postsRoutes.post('/:postId/like', likePost);
postsRoutes.get('/byId/:postId', getPostByID);
postsRoutes.post('/', createPost);
postsRoutes.post('/:postId', createPost);
