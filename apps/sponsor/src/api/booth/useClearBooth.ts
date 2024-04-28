import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

export const clearBooth = () => {
  return api.delete<never, never>(`/booth/clear`);
};

export const useClearBooth = () => {
  const queryClient = useQueryClient();

  return useMutation(clearBooth, {
    onSuccess: () => {
      queryClient.invalidateQueries(['booth']);
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Odabir štanda uspješno uređen');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
