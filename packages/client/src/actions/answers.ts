import { useMutation, useQueryClient } from 'react-query';
import { Request } from '../utils/request';

export const useAnswerLike = (questionId, answerId) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['answers', { questionId }, { answerId }],
    () =>
      Request(`/questions/answer/${answerId}/like`, {
        method: 'POST',
      }),
    {
      onSuccess: (newAnswersData) => {
        let answers = queryClient.getQueryData(['answers', { questionId }]);

        if (Array.isArray(answers)) {
          answers = answers.map((answer) => {
            if (answer._id === newAnswersData._id) {
              return newAnswersData;
            }
            return answer;
          });
        }

        console.log(answers);

        queryClient.setQueryData(
          [['answers', { questionId }, { answerId }]],
          newAnswersData
        );
        queryClient.setQueryData(['answers', { questionId }], answers);
      },
    }
  );
};
