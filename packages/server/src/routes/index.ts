import express from 'express';

import { withAuthentication } from '../middlewares/withAuthentication';

import { usersRoutes } from './users.routes';
import { postsRoutes } from './posts.routes';
import { authRoutes } from './auth.routes';
import { commentsRoutes } from './comments.routes';

export const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', withAuthentication(), usersRoutes);
routes.use('/posts', withAuthentication(), postsRoutes);
routes.use('/comments', withAuthentication(), commentsRoutes);
