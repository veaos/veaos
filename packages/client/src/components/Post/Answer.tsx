import React from 'react';
import { Actions, Content, Header } from './Post';
import { useDeleteAnswer, useLikeAnswer } from '../../actions/answer.actions';
import { Comments } from '../Comments/Comments';

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
  const { mutate: mutateDeletePost } = useDeleteAnswer({
    questionId: post,
    postId: _id,
  });

  return (
    <div className="flex flex-col px-10 py-8 bg-white">
      <Header
        postId={_id}
        createdBy={createdBy}
        createdAt={createdAt}
        small
        onDeletePost={mutateDeletePost}
      />
      <Content body={body} small />
      <Actions
        liked={Boolean(liked)}
        computed={computed}
        mutate={mutate}
        small
      />
      <Comments postId={_id} />
    </div>
  );
};
