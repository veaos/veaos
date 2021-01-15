import React from 'react';
import { Actions, Content, Header } from './Question';
import { useAnswerLike } from '../../actions/answers';

export const Answer = ({
  _id,
  createdBy,
  body,
  createdAt,
  questionId,
  likes,
  liked,
}) => {
  const { mutate } = useAnswerLike(questionId, _id);

  return (
    <div className="flex flex-col px-10 py-8 bg-white">
      <Header createdBy={createdBy} createdAt={createdAt} small />
      <Content body={body} small />
      <Actions onLike={mutate} liked={liked} likes={likes} small />
    </div>
  );
};
