import axios from '../base';
import { useQuery } from 'react-query';
import { RewardDto } from '@ddays-app/types/src/dto/reward';
import { QUERY_KEYS } from '@/constants/queryKeys';
const getAllRewards = async (): Promise<RewardDto[]> => {
  return axios.get('/reward');
};

export const useGetAllRewards = () => {
  return useQuery<RewardDto[]>([QUERY_KEYS.reward], getAllRewards);
};
