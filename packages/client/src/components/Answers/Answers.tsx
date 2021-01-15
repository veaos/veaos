import React from 'react';

import { Answer } from '../Post/Answer';
import { useGetAnswers } from '../../actions/answer.actions';

export const Answers = ({ questionId }) => {
  const { data, isLoading } = useGetAnswers({ questionId });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data?.length) {
    return <div />;
  }

  return (
    <>
      <span className="text-2xl font-semibold my-5 block">Answers</span>
      <div className="flex flex-col gap-4">
        {data?.map((answer, i) => (
          <Answer {...answer} questionId={questionId} key={i} />
        ))}
      </div>
    </>
  );
};
