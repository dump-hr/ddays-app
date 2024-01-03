import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { CreateNotificationDto } from '../types/notification';
import { api } from '.';

const deleteNotification = async (id: number) =>
  await api.delete<CreateNotificationDto, number>(`/notification/${id}`);

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteNotification, {
    onSuccess: () => {
      toast.success('Notification delete');
      queryClient.invalidateQueries(['notification']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
