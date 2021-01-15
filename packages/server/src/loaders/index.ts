import { expressLoader } from './express';
import { passportLoader } from './passport';
import { routes } from '../routes';

export const loaders = ({ expressApp }) => {
  expressLoader({ expressApp });
  passportLoader({ expressApp });

  expressApp.use('/', routes);
};
