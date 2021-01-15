require('dotenv').config({ path: '.env' });

import { app } from './application';

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
