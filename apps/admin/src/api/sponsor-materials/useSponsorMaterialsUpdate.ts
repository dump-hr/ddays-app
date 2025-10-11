import {
  SponsorMaterialsDto,
  SponsorMaterialsModifyDto,
} from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const updateSponsorMaterials = async (
  dto: SponsorMaterialsModifyDto & { id: number },
) => {
  return await api.patch<SponsorMaterialsModifyDto, SponsorMaterialsDto>(
    `/sponsor-materials/${dto.id}`,
    dto,
  );
};

export const useSponsorMaterialsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(updateSponsorMaterials, {
    onSuccess: (sponsor) => {
      queryClient.invalidateQueries(['sponsor-materials', sponsor.id]);
      queryClient.invalidateQueries(['sponsor-materials']);
      toast.success('Sponzorski materijali uspješno ažurirani');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
