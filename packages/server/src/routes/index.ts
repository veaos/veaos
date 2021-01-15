import * as express from 'express';

import { withAuthentication } from '../middlewares/withAuthentication';

import { usersRoutes } from './users.routes';
import { questionRoutes } from './question.routes';
import { authRoutes } from './auth.routes';

export const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', withAuthentication(), usersRoutes);
routes.use('/questions', withAuthentication(), questionRoutes);
