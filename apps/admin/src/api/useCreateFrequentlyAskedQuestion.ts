import { getCreateFrequentlyAskedQuestionDto } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

type FrequentlyAskedQuestion = InstanceType<
  ReturnType<typeof getCreateFrequentlyAskedQuestionDto>
>;

const createEvent = async (
  newFrequentlyAskedQuestion: FrequentlyAskedQuestion,
) =>
  await api.post<FrequentlyAskedQuestion, never>(
    '/faq',
    newFrequentlyAskedQuestion,
  );

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('faq');
    },
    onError: () => {
      console.log('Error');
    },
  });
};
