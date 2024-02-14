import { InterestDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const interestRemove = async (id: number) => {
  return await api.delete<never, InterestDto>(`/interest/${id}`);
};

export const useInterestRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(interestRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['interest']);
      toast.success('Interest uspješno uklonjen!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
