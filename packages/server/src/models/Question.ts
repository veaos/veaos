import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IQuestion extends Document {
  title: string;
  body: string;
  createdBy: IUser | string;
  computed: { likes: number; answers: number };
}

const QuestionSchema: Schema = new Schema(
  {
    title: String,
    body: String,
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

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
