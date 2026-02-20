import {
  FrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionModifyDto,
} from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const faqCreate = async (dto: FrequentlyAskedQuestionModifyDto) => {
  return api.post<FrequentlyAskedQuestionModifyDto, FrequentlyAskedQuestionDto>(
    '/faq',
    dto,
  );
};

export const useFaqCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(faqCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['faq']);
      toast.success('FAQ uspješno dodan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
