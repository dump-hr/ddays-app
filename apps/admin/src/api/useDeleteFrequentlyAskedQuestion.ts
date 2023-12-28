import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteFrequentlyAskedQuestion = (frequentlyAskedQuestionId: number) =>
  api.delete<never, never>(`/faq/${frequentlyAskedQuestionId}`);

export const useDeleteFrequentlyAskedQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteFrequentlyAskedQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('faq');
    },
  });
};
