import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IAnswer extends Document {
  body: string;
  questionId: string;
  createdBy: IUser | string;
  likes: number;
}

const AnswerSchema: Schema = new Schema(
  {
    body: String,
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
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

export const Answer = mongoose.model<IAnswer>('Answer', AnswerSchema);
