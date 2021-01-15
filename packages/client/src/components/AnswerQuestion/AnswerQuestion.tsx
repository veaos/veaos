import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { Button } from '../UI/Button';
import { Request } from '../../utils/request';
import { MarkdownTextField } from '../MarkdownTextField/MarkdownTextField';

export const AnswerQuestion = ({ id }) => {
  const queryClient = useQueryClient();

  const { register, setValue, handleSubmit, errors, reset } = useForm();

  React.useEffect(() => {
    register('body', { required: true });
  }, [register]);

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
        <MarkdownTextField
          error={errors.body}
          onChange={(value) => {
            setValue('body', value);
          }}
        />
        <div className="mt-4">
          <Button type="submit">Post Your Answer</Button>
        </div>
      </form>
    </>
  );
};
