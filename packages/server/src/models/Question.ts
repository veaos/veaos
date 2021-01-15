import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IQuestion extends Document {
  title: string;
  body: string;
  createdBy: IUser | string;
  likes: number;
}

const QuestionSchema: Schema = new Schema(
  {
    title: String,
    body: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: Number,
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
