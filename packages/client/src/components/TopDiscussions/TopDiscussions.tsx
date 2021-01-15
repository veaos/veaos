import React from 'react';

const discussion = {
  title: 'What advice can you offer on pet project time managment?',
  responses: 12,
};

const discussions = [
  discussion,
  discussion,
  discussion,
  discussion,
  discussion,
];

export const TopDiscussions = () => (
  <div className="bg-white py-6 px-5 w-full">
    <h1 className="text-2xl text-gray-500 font-light"> Top Discussions</h1>
    <ul className="text-sm mt-5 space-y-5">
      {discussions.map(({ title, responses }, i) => (
        <li className="flex space-x-5" key={i}>
          <span className="text-3xl font-light text-gray-300">{i + 1}</span>
          <div className="flex flex-col">
            <div>
              <strong>{title}</strong>
            </div>
            <span className="mt-1 font-sm text-gray-500">
              {responses} Responses
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
