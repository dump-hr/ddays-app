import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import {
  SponsorMaterialsDto,
  SponsorMaterialsModifyDto,
} from '@ddays-app/types';

const sponsorMaterialsCreate = async (
  dto: Partial<SponsorMaterialsModifyDto> & { sponsorId: number },
) => {
  return await api.post<
    Partial<SponsorMaterialsModifyDto>,
    SponsorMaterialsDto
  >('/sponsor-materials', dto);
};

export const useSponsorMaterialsCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(sponsorMaterialsCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsor-materials']);
      toast.success('Sponzorski materijali uspješno kreirani!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
