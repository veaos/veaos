import React from 'react';
import { useHistory } from 'react-router-dom';

interface IButton {
  color?: string;
  icon?: any;
  path?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button = ({
  color = 'blue',
  icon,
  path,
  onClick,
  children,
  type,
}: IButton) => {
  const history = useHistory();
  return (
    <button
      className={`flex items-center
                ${icon ? 'pl-3' : 'pl-6'}
                pr-6 py-2 text-sm focus:outline-none bg-${color}-500 text-${color}-50 
                max-w-max rounded-full focus:ring-2 ring-${color}-500 ring-offset-2`}
      onClick={(e) => {
        if (path) {
          history.push(path);
        } else if (onClick) {
          onClick(e);
        }
      }}
      type={type}
    >
      {icon
        ? React.createElement(icon, {
            className: 'h-4 mr-2',
          })
        : null}
      {children}
    </button>
  );
};
