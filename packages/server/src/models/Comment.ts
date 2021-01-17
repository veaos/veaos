import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IComment extends Document {
  body: string;
  createdBy: IUser | string;
}

const CommentSchema: Schema = new Schema(
  {
    body: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
