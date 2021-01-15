import React, { useEffect } from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { textFieldClassName } from '../UI/TextField';

export const MarkdownTextField = ({
  error,
  onChange,
}: {
  error?: boolean;
  onChange: (e) => void;
}) => {
  const [value, setValue] = React.useState('');

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        disablePreview={true}
        classes={{
          reactMde:
            'border-0 ring-red-400 ring-offset-1' + (error ? ' ring-1' : ''),
          textArea: textFieldClassName,
          toolbar: 'border-0',
        }}
      />
    </div>
  );
};
