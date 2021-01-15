import React, { useEffect, useRef, useState } from 'react';
import gravatar from 'gravatar';
import { BellOutline } from 'heroicons-react';

import { TextField } from '../UI/TextField';
import { useAuth } from '../../context/AuthContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const UserDropdown = ({ onToggle, open, user }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    open && onToggle(false);
  });

  return (
    <div className="relative" ref={ref}>
      <button
        className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
        onClick={() => onToggle()}
      >
        <img
          className="h-full w-full object-cover"
          src={gravatar.url(user.email)}
          alt={user.email}
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 ${
          open ? null : 'hidden'
        }`}
      >
        <a
          href={`${process.env.REACT_APP_API_URL}/auth/logout`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

const NotificationsDropdown = ({ onToggle, open, user }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    open && onToggle(false);
  });

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => onToggle()}
        className="flex mx-4 text-gray-600 focus:outline-none"
      >
        <BellOutline className="h-7 w-7" />
      </button>

      <div
        className={`absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10 ${
          open ? null : 'hidden'
        }`}
      >
        <a className="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-indigo-600 -mx-2">
          <img
            className="h-8 w-8 rounded-full object-cover mx-1"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
            alt="avatar"
          />
          <p className="text-sm mx-2">
            <span className="font-bold">Sara Salah</span> replied on the{' '}
            <span className="font-bold text-indigo-400">Upload Image</span>{' '}
            artical . 2m
          </p>
        </a>
      </div>
    </div>
  );
};

export const Header = () => {
  const [open, setOpen] = useState<null | 'user' | 'notifications'>(null);

  const { user } = useAuth();

  return (
    <header className="sticky bg-white top-0 flex justify-between items-center py-4 px-6 h-16">
      <div className="w-1/4">
        <TextField name="search" placeholder="Search" />
      </div>
      <div className="flex items-center">
        {/*<NotificationsDropdown
          onToggle={(state) => {
            setOpen(
              state !== undefined
                ? state
                : open === 'notifications'
                ? null
                : 'notifications'
            );
          }}
          open={open === 'notifications'}
          user={user}
        />*/}
        <UserDropdown
          onToggle={(state) => {
            console.log(state);
            setOpen(
              state !== undefined ? state : open === 'user' ? null : 'user'
            );
          }}
          open={open === 'user'}
          user={user}
        />
      </div>
    </header>
  );
};
