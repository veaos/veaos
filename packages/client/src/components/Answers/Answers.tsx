import React from 'react';
import { useQuery } from 'react-query';

import { Request } from '../../utils/request';
import { Answer } from '../Question/Answer';

export const Answers = ({ questionId }) => {
  const { data, isLoading } = useQuery(
    ['answers', { questionId }],
    () => Request(`/questions/${questionId}/answers`)
  );

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
