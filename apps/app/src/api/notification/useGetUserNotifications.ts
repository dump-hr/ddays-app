import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { NotificationResponseDto } from '@ddays-app/types';

const getUserNotifications = async () => {
  return axios.get<never, NotificationResponseDto[]>('/notifications/user');
};

export const useGetUserNotifications = () => {
  return useQuery(QUERY_KEYS.userNotifications, getUserNotifications, {
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    staleTime: 0,
    cacheTime: 60000,
  });
};
