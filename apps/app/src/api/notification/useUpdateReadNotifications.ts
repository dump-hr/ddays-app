import { useMutation, useQueryClient } from 'react-query';
import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const updateReadNotifications = async (dto: number[]) => {
  return axios.patch('/notifications/read', dto);
};

export const useUpdateReadNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation(updateReadNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.userNotifications);
      queryClient.invalidateQueries(QUERY_KEYS.unreadNotificationsCount);
    },
    onError: (error: string) => {
      console.error('Error updating notification:', error);
    },
  });
};
