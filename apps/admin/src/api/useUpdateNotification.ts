import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { UpdateNotificationDto } from '../types/notification';
import { api } from '.';

const updateNotification = async (
  id: number,
  notification: UpdateNotificationDto,
) =>
  await api.put<UpdateNotificationDto, number>(
    `/notification/${id}`,
    notification,
  );

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      id,
      notification,
    }: {
      id: number;
      notification: UpdateNotificationDto;
    }) => updateNotification(id, notification),
    {
      onSuccess: () => {
        toast.success('Notification updated');
        queryClient.invalidateQueries('notification');
      },
      onError: (error: string) => {
        toast.error(error);
      },
    },
  );
};
