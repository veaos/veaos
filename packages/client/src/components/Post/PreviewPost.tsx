import React from 'react';
import { useHistory } from 'react-router-dom';
import { Actions, Content, Header } from './Post';
import {
  useDeleteQuestion,
  useLikeQuestion,
} from '../../actions/question.actions';

export const PreviewPost = ({
  _id,
  computed,
  liked,
  title,
  createdBy,
  body,
  createdAt,
}) => {
  const history = useHistory();
  const { mutate } = useLikeQuestion({ postId: _id });
  const { mutate: mutateDeleteQuestion } = useDeleteQuestion({ postId: _id });

  return (
    <div className="flex flex-col px-10 py-8 bg-white">
      <Header
        _id={_id}
        createdBy={createdBy}
        createdAt={createdAt}
        onDeletePost={mutateDeleteQuestion}
      />
      <Content
        title={title}
        body={body}
        previewMode={true}
        onClickTitle={() => {
          history.push(`/question/${_id}`);
        }}
      />
      <Actions computed={computed} liked={Boolean(liked)} mutate={mutate} />
    </div>
  );
};
