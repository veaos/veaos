import React from 'react';
import { AskQuestion } from '../../components/AskQuestion/AskQuestion';

export const AskQuestionRoute = () => {
  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-5">
        <AskQuestion />
      </div>
      <div className="col-span-2">ff</div>
    </div>
  );
};
