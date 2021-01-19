import express from 'express';
import { search } from '../controllers/search.controller';

export const searchRoutes = express.Router();

searchRoutes.get('/', search);
