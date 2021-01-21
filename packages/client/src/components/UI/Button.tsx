import React from 'react';
import { useHistory } from 'react-router-dom';

export interface IButton<TOnClick = null> {
  color?: string;
  icon?: any;
  path?: string;
  type?: 'submit' | 'reset' | 'button';
  outlined?: boolean;
  className?: string;
  onClick?: TOnClick;
  children?: React.ReactNode;
}

export const Button = ({
  color = 'blue',
  icon,
  path,
  onClick,
  children,
  type,
  outlined,
  className,
}: IButton<(e: React.MouseEvent<HTMLButtonElement>) => void>) => {
  const history = useHistory();
  return (
    <button
      className={`flex items-center border-2 border-${color}-500
                ${
                  outlined
                    ? `text-${color}-500`
                    : `bg-${color}-500 text-${color}-50`
                }
                ${icon ? 'pl-3' : 'pl-6'}
                pr-6 py-2 text-sm focus:outline-none 
                max-w-max rounded-full focus:ring-2 ring-${color}-500 ring-offset-2
                ${className ? className : ''}`}
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
