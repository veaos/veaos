import { logger } from '../utils/logger';

export const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error(err);
    res.formatter.serverError();
  } else {
    next();
  }
};
