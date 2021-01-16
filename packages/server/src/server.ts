require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
});

import { app } from './application';

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
