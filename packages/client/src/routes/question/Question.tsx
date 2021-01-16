import React from 'react';
import { Post } from '../../components/Post/Post';
import { AnswerQuestion } from '../../components/AnswerQuestion/AnswerQuestion';
import { Answers } from '../../components/Answers/Answers';
import { useGetQuestion } from '../../actions/question.actions';

export const QuestionRoute = ({
  match: {
    params: { id },
  },
}) => {
  const { data, isLoading, isFetched } = useGetQuestion({ postId: id });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data && isFetched) {
    return <div>there is nothing here</div>;
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-5">
        <Post {...data} />
        <Answers questionId={id} />
        <AnswerQuestion id={id} />
      </div>
      <div className="col-span-2" />
    </div>
  );
};
