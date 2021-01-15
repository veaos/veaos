import * as express from 'express';
import { loaders } from './loaders';

import './config/mongoose';

export const app = express();

loaders({ expressApp: app });
