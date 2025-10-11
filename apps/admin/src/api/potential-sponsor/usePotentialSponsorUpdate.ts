import {
  PotentialSponsorDto,
  PotentialSponsorModifyDto,
} from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const updatePotentialSponsor = async (
  dto: PotentialSponsorModifyDto & { id: number },
) => {
  return await api.patch<PotentialSponsorModifyDto, PotentialSponsorDto>(
    `/potential-sponsor/${dto.id}`,
    dto,
  );
};

export const usePotentialSponsorUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePotentialSponsor, {
    onSuccess: (sponsor) => {
      queryClient.invalidateQueries(['potential-sponsor', sponsor.id]);
      queryClient.invalidateQueries(['potential-sponsor']);
      toast.success('Potencijalni sponzor uspješno ažuriran');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
