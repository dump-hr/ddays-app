import { FrequentlyAskedQuestionDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const faqRemove = async (id: number) => {
  return await api.delete<never, FrequentlyAskedQuestionDto>(`/faq/${id}`);
};

export const useFaqRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(faqRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['faq']);
      toast.success('FAQ uspješno uklonjen!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
