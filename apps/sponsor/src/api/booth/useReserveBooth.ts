import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

export const reserveBooth = (id: number) => {
  return api.put<never, never>(`/booth/reserve/${id}`);
};

export const useReserveBooth = () => {
  const queryClient = useQueryClient();

  return useMutation(reserveBooth, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Štand uspješno rezerviran');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
