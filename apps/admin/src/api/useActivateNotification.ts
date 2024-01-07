import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const activateNotification = async (id: number) => {
  await api.patch<number>(`/notification/activate/${id}`);
};

export const useActivateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(activateNotification, {
    onSuccess: () => {
      toast.success('Notification activated');
      queryClient.invalidateQueries(['notification']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
