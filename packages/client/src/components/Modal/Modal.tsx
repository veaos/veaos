import React from 'react';
import * as Icons from 'heroicons-react';
import { Button, IButton } from '../UI/Button';

interface IModalButton extends IButton<(e, onClose: () => void) => void> {
  text: string;
}

interface IModal {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  buttons?: IModalButton[];
  onClose?: () => void;
}

export const Modal = ({ open, title, children, buttons, onClose }: IModal) => {
  return (
    <div
      className={`${
        open ? 'opacity-1' : 'opacity-0 pointer-events-none'
      } flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-40 z-50`}
    >
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            {title ? (
              <div className="text-gray-900 font-medium text-lg">{title}</div>
            ) : null}
            <Icons.X
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              onClick={onClose}
            />
          </div>
          <hr />
          <div>{children}</div>
          <hr />
          <div className="flex gap-2 ml-auto">
            {buttons ? (
              buttons?.map(({ text, onClick, ...props }, i) => (
                <Button key={i} onClick={(e) => onClick(e, onClose)} {...props}>
                  {text}
                </Button>
              ))
            ) : (
              <Button outlined onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
