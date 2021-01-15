import React from 'react';
import { PencilOutline } from 'heroicons-react';
import { useQuery } from 'react-query';

import { PreviewQuestion } from '../../components/Question/PreviewQuestion';
import { TopDiscussions } from '../../components/TopDiscussions/TopDiscussions';
import { Button } from '../../components/UI/Button';
import { Request } from '../../utils/request';

export const QuestionsRoute = () => {
  const { data, isLoading } = useQuery('questions', () =>
    Request('/questions')
  );

  if (isLoading) {
    return <div>fetching...</div>;
  }

  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-6">
        <div className="flex space-x-5">
          <Button color="green" icon={PencilOutline} path="/question/ask">
            Ask a question
          </Button>
        </div>
        <div className="flex flex-col gap-5 mt-8">
          {data?.map((question, i) => (
            <PreviewQuestion {...question} key={i} />
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <TopDiscussions />
      </div>
    </div>
  );
};
