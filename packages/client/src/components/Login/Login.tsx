import React from 'react';
import SlackIcon from '../../assets/icons/Slack';

export const Login = () => {
  return (
    <div className="bg-gray-300 w-full min-h-full flex items-center justify-center">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <button
          onClick={() => {
            location.href = process.env.REACT_APP_API_URL + '/auth/slack';
          }}
          className="relative border border-gray-200 h-12 text-sm text-gray-800 rounded-lg"
        >
          <span className="absolute left-0 top-0 flex items-center justify-center h-full w-12 text-blue-500">
            <SlackIcon className="text-xl" />
          </span>
          Sign in with <strong className="font-semibold">Slack</strong>
        </button>
      </div>
    </div>
  );
};
