import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getUserPoints = async (): Promise<{ points: number }> => {
  return axios.get('/shop/points');
};

export const useGetUserPoints = () => {
  return useQuery<{ points: number }>([QUERY_KEYS.userPoints], getUserPoints);
};
