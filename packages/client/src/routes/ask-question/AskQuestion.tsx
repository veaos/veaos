import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostEditor } from '../../components/PostEditor/PostEditor';
import { useCreateQuestion } from '../../actions/question.actions';

export const AskQuestionRoute = () => {
  const history = useHistory();
  const { mutate, data, isSuccess } = useCreateQuestion();

  if (isSuccess) {
    history.push(`/question/${data.post || data._id}`);
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-5">
        <PostEditor mutate={mutate} />
      </div>
      <div className="col-span-2">ff</div>
    </div>
  );
};
