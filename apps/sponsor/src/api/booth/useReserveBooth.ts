import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

export const reserveBooth = (id: number) => {
  return api.put<never, never>(`/company/booth/${id}`);
};

export const useReserveBooth = () => {
  const queryClient = useQueryClient();

  return useMutation(reserveBooth, {
    onSuccess: () => {
      queryClient.invalidateQueries(['booth', 'current']);
      toast.success('Štand uspješno rezerviran');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
    onError: (error: string) => {
      toast.error('Došlo je do greške pri rezervaciji štanda:' + error);
    },
  });
};
