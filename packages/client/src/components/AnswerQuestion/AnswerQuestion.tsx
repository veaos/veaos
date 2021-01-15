import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../UI/Button';
import { MarkdownTextField } from '../MarkdownTextField/MarkdownTextField';
import { useCreateAnswer } from '../../actions/answer.actions';

export const AnswerQuestion = ({ id }) => {
  const { register, setValue, handleSubmit, errors, watch, reset } = useForm();

  React.useEffect(() => {
    register('body', { required: true });
  }, [register]);

  const { mutate } = useCreateAnswer({ questionId: id });

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  return (
    <>
      <span className="text-xl font-semibold mt-5 block">Your Answer</span>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 mt-6">
        <MarkdownTextField
          value={watch('body')}
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
