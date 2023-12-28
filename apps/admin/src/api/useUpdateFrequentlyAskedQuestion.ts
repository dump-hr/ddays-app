import { getUpdateFrequentlyAskedQuestionDto } from '@ddays-app/types';
import { FrequentlyAskedQuestion } from '@ddays-app/types/src/model/frequentlyAskedQuestion';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

type UpdateFrequentlyAskedQuestionDto = InstanceType<
  ReturnType<typeof getUpdateFrequentlyAskedQuestionDto>
>;

const updateFrequentlyAskedQuestion = async ({
  id,
  ...newFrequentlyAskedQuestion
}: FrequentlyAskedQuestion) => {
  const data = await api.patch<UpdateFrequentlyAskedQuestionDto, never>(
    `/faq/${id}`,
    newFrequentlyAskedQuestion,
  );

  return data;
};

export const useUpdateFrequentlyAskedQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFrequentlyAskedQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['faq']);
    },
    onError: () => {
      console.log("Couldn't update survey question");
    },
  });
};
