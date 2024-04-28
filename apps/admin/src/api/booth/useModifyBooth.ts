import { BoothUpdateDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const updateBooth = async (dto: BoothUpdateDto & { id: number }) => {
  return await api.patch(`/booth/${dto.id}`, dto);
};

export const useUpdateBooth = () => {
  const queryClient = useQueryClient();

  return useMutation(updateBooth, {
    onSuccess: () => {
      queryClient.invalidateQueries(['booth']);
      toast.success('Booth successfully updated!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
