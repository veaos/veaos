import React from 'react';
import { Actions, Content, Header } from './Post';
import { useLikeAnswer } from '../../actions/answer.actions';

export const Answer = ({
  _id,
  post,
  createdBy,
  body,
  createdAt,
  computed,
  liked,
}) => {
  const { mutate } = useLikeAnswer({ answerId: _id, questionId: post });

  return (
    <div className="flex flex-col px-10 py-8 bg-white">
      <Header _id={_id} createdBy={createdBy} createdAt={createdAt} small />
      <Content body={body} small />
      <Actions
        liked={Boolean(liked)}
        computed={computed}
        mutate={mutate}
        small
      />
    </div>
  );
};
