import React from 'react';

interface ITextField {
  multiline?: boolean;
  error?: boolean;
  placeholder?: string;
  name: string;
}

export const textFieldClassName =
  'w-full tracking-wide py-2 px-4 leading-relaxed appearance-none block ' +
  'text-gray-700 bg-gray-200 rounded focus:bg-gray-300 focus:outline-none focus:shadow-inner ring-1 ring-transparent';

export const TextField = React.forwardRef(
  ({ multiline, name, placeholder, error }: ITextField, ref: any) => {
    let className = textFieldClassName;

    if (error) {
      className += ' ring-red-400 ring-offset-1';
    }

    return multiline ? (
      <textarea
        name={name}
        ref={ref}
        placeholder={placeholder}
        className={className + ' h-52'}
      />
    ) : (
      <input
        name={name}
        ref={ref}
        placeholder={placeholder}
        className={className}
      />
    );
  }
);
