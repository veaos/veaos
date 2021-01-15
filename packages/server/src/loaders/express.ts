import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieSession from 'cookie-session';
import { responseEnhancer } from 'express-response-formatter';

export const expressLoader = ({ expressApp }) => {
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
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  expressApp.use(helmet());
  expressApp.use(responseEnhancer());
};
