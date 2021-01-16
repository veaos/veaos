import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IAnswer extends Document {
  body: string;
  questionId: string;
  createdBy: IUser | string;
  computed: {
    likes: number;
  };
}

const AnswerSchema: Schema = new Schema(
  {
    body: String,
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    computed: {
      likes: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Answer = mongoose.model<IAnswer>('Answer', AnswerSchema);
