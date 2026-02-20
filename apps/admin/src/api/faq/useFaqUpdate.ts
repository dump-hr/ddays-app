import {
  FrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionModifyDto,
} from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const faqUpdate = async (
  dto: FrequentlyAskedQuestionModifyDto & { id: number },
) => {
  return await api.patch<
    FrequentlyAskedQuestionModifyDto,
    FrequentlyAskedQuestionDto
  >(`/faq/${dto.id}`, {
    ...dto,
    id: undefined,
  });
};

export const useFaqUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(faqUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['faq']);
      toast.success('FAQ uspješno uređen!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
