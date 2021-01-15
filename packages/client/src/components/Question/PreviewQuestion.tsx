import React from 'react';
import { useHistory } from 'react-router-dom';
import { Actions, Content, Header } from './Question';
import { useQuestionLike } from '../../actions/questions';

export const PreviewQuestion = ({
  _id,
  likes,
  liked,
  title,
  createdBy,
  body,
  createdAt,
}) => {
  const history = useHistory();
  const { mutate } = useQuestionLike(_id);

  return (
    <div className="flex flex-col px-10 py-8 bg-white">
      <Header createdBy={createdBy} createdAt={createdAt} />
      <Content
        title={title}
        body={body}
        previewMode={true}
        onClickTitle={() => {
          history.push(`/question/${_id}`);
        }}
      />
      <Actions likes={likes} liked={liked} onLike={mutate} />
    </div>
  );
};
