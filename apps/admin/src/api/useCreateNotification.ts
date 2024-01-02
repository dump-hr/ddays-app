import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { CreateNotificationDto } from '../types/notification';
import { api } from '.';

const createNotification = async (req: CreateNotificationDto) =>
  await api.post<CreateNotificationDto, number>('/notification', req);

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(createNotification, {
    onSuccess: () => {
      toast.success('Notification created');
      queryClient.invalidateQueries('notification');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
