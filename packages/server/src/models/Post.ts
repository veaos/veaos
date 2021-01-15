import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
  title: string;
  body: string;
  createdBy: IUser | string;
  post(): this;
  computed: { likes: number; answers?: number };
}

const PostSchema: Schema = new Schema(
  {
    title: String,
    body: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    computed: {
      likes: { type: Number, default: 0 },
      answers: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<IPost>('Post', PostSchema);
