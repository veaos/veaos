import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IPost } from './Post';

export interface ILike extends Document {
  body: string;
  post?: string | IPost;
  likedBy: IUser;
}

const LikeSchema: Schema = new Schema(
  {
    body: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model<ILike>('Like', LikeSchema);
