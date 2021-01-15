import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import * as Icons from 'heroicons-react';
import gravatar from 'gravatar';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import detectLang from 'lang-detector';

import { useQuestionLike } from '../../actions/questions';

export const Header = ({
  createdBy: { email, name },
  createdAt,
  small,
}: {
  createdBy: { email: string; name: string };
  createdAt: string;
  small?: boolean;
}) => (
  <div className="flex items-center w-full">
    <img
      className={`${
        small ? 'w-8 h-8' : 'w-12 h-12'
      } rounded-full object-cover mr-4 shadow`}
      src={gravatar.url(email)}
      alt="avatar"
    />
    <div className="w-full">
      <div className="flex flex-col">
        <div>
          <h2 className={`${!small ? 'text-lg' : 'text-sm'} text-gray-900`}>
            <strong>{name}</strong>
            <span className={`${small ? 'text-xs' : 'text-sm'} text-gray-500`}>
              {' '}
              in{' '}
            </span>
            <span className={small ? 'text-xs' : 'text-sm'}>Java</span>
          </h2>
        </div>
        <small className={`${small ? 'text-xs' : 'text-sm'} text-gray-700`}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </small>
      </div>
    </div>
  </div>
);

const renderers = (ignore = []) => ({
  code: ({ language, value }) => {
    if (ignore.includes('code')) {
      return null;
    }

    return (
      <div className="text-sm">
        <SyntaxHighlighter
          style={materialDark}
          showLineNumbers={true}
          language={language || detectLang(value)?.toLowerCase()}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  },
});

export const Content = ({
  title,
  body,
  onClickTitle,
  small,
  previewMode,
}: {
  title?: string;
  body: string;
  small?: boolean;
  previewMode?: boolean;
  onClickTitle?: () => void;
}) => {
  let ignore;

  if (previewMode) {
    ignore = ['code'];
  }

  return (
    <div className={small ? 'mt-4' : 'mt-8'}>
      <article>
        {title ? (
          <h1
            className="text-3xl md-3 font-semibold cursor-pointer"
            onClick={() => {
              onClickTitle && onClickTitle();
            }}
          >
            {title}
          </h1>
        ) : null}
        <p
          className={`${
            !small ? 'text-lg mt-3' : 'mt-1'
          } leading-relaxed text-gray-800`}
        >
          <ReactMarkdown renderers={renderers(ignore)}>{body}</ReactMarkdown>
        </p>
      </article>
    </div>
  );
};

export const Actions = ({
  small,
  likes,
  liked,
  onLike,
}: {
  small?: boolean;
  likes: number;
  liked?: any;
  onLike: () => void;
}) => {
  return (
    <div className={small ? 'mt-4' : 'mt-6'}>
      <div className="flex items-center">
        <button
          onClick={onLike}
          className="bg-red-100 text-red-400 fill-current rounded-full p-1 focus:outline-none ring-opacity-80 ring-red-500 ring-offset-2 focus:ring-2"
        >
          {liked ? <Icons.Heart /> : <Icons.HeartOutline />}
        </button>
        <span className="text-gray-400 ml-3">{likes}</span>
      </div>
    </div>
  );
};

export const Question = ({
  _id,
  liked,
  title,
  likes,
  createdBy,
  body,
  createdAt,
}) => {
  const { mutate } = useQuestionLike(_id);

  return (
    <div className="flex flex-col px-10 py-8 bg-white">
      <Header createdBy={createdBy} createdAt={createdAt} />
      <Content title={title} body={body} />
      <Actions liked={liked} likes={likes} onLike={mutate} />
    </div>
  );
};
