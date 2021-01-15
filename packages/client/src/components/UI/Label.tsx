import React from 'react';

interface ILabel {
  title?: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
}

export const Label = ({ title, description, error, children }: ILabel) => {
  return (
    <label className="flex flex-col">
      {title ? (
        <span
          className={`block font-semibold text-gray-600 ${
            !description ? 'mb-1' : null
          }`}
        >
          {title}
        </span>
      ) : null}
      {description ? (
        <span className="block text-gray-500 text-xs mb-2">{description}</span>
      ) : null}
      {children}
      {error ? (
        <span className="mt-1 text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
};
