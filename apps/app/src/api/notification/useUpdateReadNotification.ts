import { useMutation, useQueryClient } from 'react-query';
import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const updateReadNotification = async (notificationId: number) => {
  return axios.patch(`/notifications/${notificationId}/read`);
};

export const useUpdateReadNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation(updateReadNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.userNotifications);
    },
    onError: (error) => {
      console.error('Error updating notification:', error);
    },
  });
};
