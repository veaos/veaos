import * as express from 'express';
import {
  createAnswer,
  createQuestion,
  getAnswersByQuestionId,
  getQuestionById,
  getQuestions,
  likeAnswer,
  likeQuestion,
} from '../controllers/question.controller';

export const questionRoutes = express.Router();

questionRoutes.get('/', getQuestions);
questionRoutes.get('/:id', getQuestionById);
questionRoutes.post('/:id/like', likeQuestion);

questionRoutes.get('/:id/answers', getAnswersByQuestionId);
questionRoutes.post('/:id/answer', createAnswer);
questionRoutes.post('/answer/:id/like', likeAnswer);

questionRoutes.post('/create', createQuestion);
