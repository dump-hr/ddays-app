import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import { SponsorContractDto, SponsorContractModifyDto } from '@ddays-app/types';

const sponsorContractsCreate = async (
  dto: Partial<SponsorContractModifyDto> & { sponsorId: number },
) => {
  return await api.post<Partial<SponsorContractModifyDto>, SponsorContractDto>(
    '/sponsor-contracts',
    dto,
  );
};

export const useSponsorContractsCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(sponsorContractsCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsor-contracts']);
      toast.success('Sponzorski ugovori uspješno kreirani!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
