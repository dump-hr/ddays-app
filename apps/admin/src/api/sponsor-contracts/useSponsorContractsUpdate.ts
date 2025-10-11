import { SponsorContractDto, SponsorContractModifyDto } from '@ddays-app/types';

import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const updateSponsorContracts = async (
  dto: SponsorContractModifyDto & { id: number },
) => {
  return await api.patch<SponsorContractModifyDto, SponsorContractDto>(
    `/sponsor-contracts/${dto.id}`,
    dto,
  );
};

export const useSponsorContractsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updateSponsorContracts, {
    onSuccess: (sponsor) => {
      queryClient.invalidateQueries(['sponsor-contracts', sponsor.id]);
      queryClient.invalidateQueries(['sponsor-contracts']);
      toast.success('Sponzorski ugovori uspješno ažurirani');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
