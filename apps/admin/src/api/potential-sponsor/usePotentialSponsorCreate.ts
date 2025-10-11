import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import {
  PotentialSponsorDto,
  PotentialSponsorModifyDto,
} from '@ddays-app/types';

const potentialSponsorCreate = async (dto: PotentialSponsorModifyDto) => {
  return await api.post<PotentialSponsorModifyDto, PotentialSponsorDto>(
    '/potential-sponsor',
    dto,
  );
};

export const usePotentialSponsorCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(potentialSponsorCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['potential-sponsor']);
      toast.success('Potencijalni sponzor uspješno kreiran!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
