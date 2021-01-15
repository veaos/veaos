import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IQuestion } from './Question';
import { IAnswer } from './Answer';

export interface ILike extends Document {
  body: string;
  question?: IQuestion;
  answer?: IAnswer;
  likedBy: IUser;
}

const LikeSchema: Schema = new Schema(
  {
    body: String,
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
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
