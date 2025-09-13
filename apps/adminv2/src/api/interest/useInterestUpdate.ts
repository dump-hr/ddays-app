import { InterestDto, InterestModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const interestUpdate = async (dto: InterestModifyDto & { id: number }) => {
  return await api.patch<InterestModifyDto, InterestDto>(
    `/interest/${dto.id}`,
    {
      ...dto,
      id: undefined,
    },
  );
};

export const useInterestUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(interestUpdate, {
    onSuccess: (updatedInterest) => {
      queryClient.invalidateQueries(['interest']);
      queryClient.invalidateQueries(['interest', updatedInterest.id]);
      toast.success('Uređivanje interesa uspješno izvršeno!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
