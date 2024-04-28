import { ModifyBoothDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const updateBooth = async (dto: ModifyBoothDto & { id: number }) => {
  return await api.patch(`/booth/${dto.id}`, dto);
};

export const useModifyBooth = () => {
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
