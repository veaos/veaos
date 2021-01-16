import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Request } from '../../utils/request';

export const TopDiscussions = () => {
  const history = useHistory();
  const { data, isLoading } = useQuery(['questions', 'top-discussions'], () =>
    Request('/posts', {
      query: {
        sort: 'computed.answers',
      },
    })
  );

  if (isLoading) {
    return <div>loading..</div>;
  }

  return (
    <div className="bg-white py-6 px-5 w-full">
      <h1 className="text-2xl text-gray-500 font-light"> Top Discussions</h1>
      <ul className="text-sm mt-5 space-y-5">
        {data.map(({ _id, title, computed: { answers } }, i) => (
          <li className="flex space-x-5" key={i}>
            <span className="text-3xl font-light text-gray-300">{i + 1}</span>
            <div className="flex flex-col">
              <div>
                <strong
                  onClick={() => {
                    history.push(`/question/${_id}`);
                  }}
                  className="cursor-pointer"
                >
                  {title}
                </strong>
              </div>
              <span className="mt-1 font-sm text-gray-500">
                {answers || 0} Responses
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
