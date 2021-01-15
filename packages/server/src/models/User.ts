import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  slackID: string;
  name: string;
}

const UserSchema: Schema = new Schema(
  {
    email: String,
    slackID: String,
    name: String,
  },
  {
    timestamps: true,
  }
);

export const upsertUser = async (user): Promise<IUser> =>
  User.findOneAndUpdate(
    { email: user.email },
    {
      email: user.email,
      slackID: user.id,
      name: user.name,
    },
    {
      upsert: true,
      new: true,
    }
  ).lean();

export const User = mongoose.model<IUser>('User', UserSchema);
