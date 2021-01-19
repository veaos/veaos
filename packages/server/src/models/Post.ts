import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
  title: string;
  body: string;
  createdBy: IUser | string;
  post(): this;
  computed: { likes: number; answers?: number; comments?: number };
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, es_indexed: true },
    body: { type: String, es_indexed: true },
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
      comments: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const Post: any = mongoose.model<IPost>('Post', PostSchema);
