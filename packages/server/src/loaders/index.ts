import * as express from 'express';
import { expressLoader } from './express';
import { passportLoader } from './passport';
import { routes } from '../routes';

export const loaders = ({
  expressApp,
}: {
  expressApp: express.Application;
}): void => {
  expressLoader({ expressApp });
  passportLoader({ expressApp });

  expressApp.use('/', routes);
};
