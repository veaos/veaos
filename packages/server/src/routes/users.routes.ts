import express from 'express';
import { me } from '../controllers/auth.contoller';

export const usersRoutes = express.Router();

usersRoutes.get('/me', me);
