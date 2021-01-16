import mongoose from 'mongoose';

mongoose.connect(String(process.env.MONGODB_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false);
