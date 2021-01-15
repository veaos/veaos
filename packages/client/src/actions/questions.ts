import { useMutation, useQueryClient } from 'react-query';
import { Request } from '../utils/request';

export const useQuestionLike = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    () =>
      Request(`/questions/${id}/like`, {
        method: 'POST',
      }),
    {
      onSuccess: (newQuestionData) => {
        let questions = queryClient.getQueryData('questions');

        if (Array.isArray(questions)) {
          questions = questions.map((question) => {
            if (question._id === newQuestionData._id) {
              return newQuestionData;
            }
            return question;
          });
        }

        queryClient.setQueryData(
          ['questions', { id: newQuestionData._id }],
          newQuestionData
        );
        queryClient.setQueryData('questions', questions);
      },
    }
  );
};
