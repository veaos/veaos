import React from 'react';
import { useQuery } from 'react-query';

import { Request } from '../../utils/request';
import { Question } from '../../components/Question/Question';
import { AnswerQuestion } from '../../components/AnswerQuestion/AnswerQuestion';
import { Answers } from '../../components/Answers/Answers';

export const QuestionRoute = ({
  match: {
    params: { id },
  },
}) => {
  const { data, isFetching, isLoading } = useQuery(['questions', { id }], () =>
    Request(`/questions/${id}`)
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-5">
        <Question {...data} />
        <Answers questionId={id} />
        <AnswerQuestion id={id} />
      </div>
      <div className="col-span-2"></div>
    </div>
  );
};
