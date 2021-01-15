import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import * as Icons from 'heroicons-react';
import gravatar from 'gravatar';

import { Markdown } from '../Markdown/Markdown';
import { useLikeQuestion } from '../../actions/question.actions';
import { useAuth } from '../../context/AuthContext';

export const Header = ({
  _id,
  createdBy: { email, name, ...createdBy },
  createdAt,
  small,
}: {
  _id: string;
  createdBy: { email: string; name: string; _id: string };
  createdAt: string;
  small?: boolean;
}) => {
  const history = useHistory();
  const { user } = useAuth();

  return (
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
              <span
                className={`${small ? 'text-xs' : 'text-sm'} text-gray-500`}
              >
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
      <div className="self-start text-xs text-gray-500">
        {createdBy._id === user._id ? (
          <button
            className="focus:outline-none"
            onClick={() => {
              history.push(`/post/${_id}/edit`);
            }}
          >
            edit
          </button>
        ) : null}
      </div>
    </div>
  );
};

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
            className={`text-3xl md-3 font-semibold ${
              onClickTitle ? 'cursor-pointer' : ''
            }`}
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
          <Markdown ignore={ignore}>{body}</Markdown>
        </p>
      </article>
    </div>
  );
};

export const Actions = ({
  small,
  computed,
  liked,
  mutate,
}: {
  small?: boolean;
  computed: {
    likes: number;
  };
  liked?: any;
  mutate: (liked: boolean) => void;
}) => {
  return (
    <div className={small ? 'mt-4' : 'mt-6'}>
      <div className="flex items-center">
        <button
          onClick={() => mutate(liked)}
          className="bg-red-100 text-red-400 fill-current rounded-full p-1 focus:outline-none ring-opacity-80 ring-red-500 ring-offset-2 focus:ring-2"
        >
          {liked ? <Icons.Heart /> : <Icons.HeartOutline />}
        </button>
        <span className="text-gray-400 ml-3">{computed.likes}</span>
      </div>
    </div>
  );
};

export const Post = ({
  _id,
  computed,
  liked,
  title,
  createdBy,
  body,
  createdAt,
}) => {
  const { mutate } = useLikeQuestion({ postId: _id });

  return (
    <div className="flex flex-col px-10 py-8 bg-white">
      <Header _id={_id} createdBy={createdBy} createdAt={createdAt} />
      <Content title={title} body={body} />
      <Actions liked={Boolean(liked)} computed={computed} mutate={mutate} />
    </div>
  );
};
