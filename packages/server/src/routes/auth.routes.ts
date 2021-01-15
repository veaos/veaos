import * as express from 'express';
import { logout } from '../controllers/auth.contoller';

export const authRoutes = express.Router();

authRoutes.get('/logout', logout);
