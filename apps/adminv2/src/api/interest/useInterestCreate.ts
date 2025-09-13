import { InterestDto, InterestModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const interestCreate = async (dto: InterestModifyDto) => {
  return await api.post<InterestModifyDto, InterestDto>('/interest', dto);
};

export const useInterestCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(interestCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['interest']);
      toast.success('Interes uspješno dodan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
