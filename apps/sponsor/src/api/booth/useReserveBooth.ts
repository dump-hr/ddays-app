import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

export const reserveBooth = (id: number) => {
  return api.put<never, never>(`booth/${id}/reserve`);
};

export const useReserveBooth = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(() => reserveBooth(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['booth', 'current']);
      toast.success('Štand uspješno rezerviran');
    },
    onError: (error: string) => {
      toast.error('Došlo je do greške pri rezervaciji štanda:' + error);
    },
  });
};
