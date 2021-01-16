import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { responseEnhancer } from 'express-response-formatter';
import { errorHandler } from '../middlewares/errorHandler';

export const expressLoader = ({ expressApp }): void => {
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());
  expressApp.use(
    cookieSession({
      expires: false,
      secret: process.env.COOKIE_KEY,
    })
  );
  expressApp.use(
    cors({
      origin: process.env.PORTAL_URL,
      credentials: true,
    })
  );
  expressApp.use(helmet());
  expressApp.use(responseEnhancer());
  expressApp.use(morgan('tiny'));
  expressApp.use(errorHandler);
};
