import { useQuery } from 'react-query';
import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getNumOfUnreadNotifications = async () => {
  return axios.get<never, { count: number }>('/notifications/unread-count');
};

export const useGetNumOfUnreadNotifications = () => {
  return useQuery(
    QUERY_KEYS.numOfUnreadNotifications,
    getNumOfUnreadNotifications,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 30000,
      staleTime: 0,
      cacheTime: 30000,
    },
  );
};
