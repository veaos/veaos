import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/veaos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false);