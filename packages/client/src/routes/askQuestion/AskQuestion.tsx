import React from 'react';
import { PostEditor } from '../../components/PostEditor/PostEditor';
import { useCreateQuestion } from '../../actions/question.actions';

export const AskQuestionRoute = () => {
  const { mutate } = useCreateQuestion();

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-5">
        <PostEditor mutate={mutate} />
      </div>
      <div className="col-span-2">ff</div>
    </div>
  );
};
