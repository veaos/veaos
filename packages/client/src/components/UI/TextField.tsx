import React from 'react';

interface ITextField {
  multiline?: boolean;
  error?: boolean;
  placeholder?: string;
  className?: string;
  name: string;
  onKeyDown?: (e) => void;
}

export const textFieldClassName =
  'w-full tracking-wide py-2 px-4 leading-relaxed appearance-none block ' +
  'text-gray-700 bg-gray-200 rounded focus:bg-gray-300 focus:outline-none focus:shadow-inner ring-1 ring-transparent';

export const TextField = React.forwardRef(
  (
    {
      multiline,
      name,
      placeholder,
      error,
      className: classNameProp,
      onKeyDown,
    }: ITextField,
    ref: any
  ) => {
    let className = textFieldClassName;

    if (error) {
      className += ' ring-red-400 ring-offset-1';
    }

    if (classNameProp) {
      className += ` ${classNameProp}`;
    }

    return multiline ? (
      <textarea
        name={name}
        ref={ref}
        placeholder={placeholder}
        className={className}
        onKeyDown={onKeyDown}
      />
    ) : (
      <input
        name={name}
        ref={ref}
        placeholder={placeholder}
        className={className}
        onKeyDown={onKeyDown}
      />
    );
  }
);
