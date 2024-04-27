import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const removeBooth = async (id: number) => {
  return await api.delete(`/booth/${id}`);
};

export const useRemoveBooth = () => {
  const queryClient = useQueryClient();

  return useMutation(removeBooth, {
    onSuccess: () => {
      queryClient.invalidateQueries(['booth', 'all']);
      toast.success('Booth successfully removed!');
    },
    onError: (error: string) => {
      console.error(error);
      toast.error('Failed to remove booth');
    },
  });
};
