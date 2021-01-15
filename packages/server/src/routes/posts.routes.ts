import * as express from 'express';

import {
  createPost,
  getPostByID,
  getPosts,
  likePost,
} from '../controllers/posts.controller';

export const postsRoutes = express.Router();

postsRoutes.get('/', getPosts);
postsRoutes.get('/:postId', getPosts);
postsRoutes.post('/:postId/like', likePost);
postsRoutes.get('/byId/:postId', getPostByID);
postsRoutes.post('/', createPost);
postsRoutes.post('/:postId', createPost);
