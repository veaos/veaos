import React from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '../UI/TextField';

export const Search = () => {
  const history = useHistory();

  return (
    <TextField
      name="search"
      placeholder="Search"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          history.push(`/search?query=${e.target.value}`);
        }
      }}
    />
  );
};
