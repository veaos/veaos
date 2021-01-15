import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { TextField } from '../UI/TextField';
import { Button } from '../UI/Button';
import { Request } from '../../utils/request';

export const AnswerQuestion = ({ id }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, errors, reset } = useForm();

  const { mutate } = useMutation(
    ['answers', { questionId: id }],
    (data) =>
      Request(`/questions/${id}/answer`, {
        method: 'POST',
        data,
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['answers', { questionId: id }]),
    }
  );

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  return (
    <>
      <span className="text-xl font-semibold mt-5 block">Your Answer</span>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 mt-6">
        <TextField
          ref={register({ required: true })}
          name="body"
          multiline
          error={errors.body}
        />
        <div className="mt-4">
          <Button type="submit">Post Your Answer</Button>
        </div>
      </form>
    </>
  );
};
