import { JobDto } from '@ddays-app/types';
import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getAllJobs = async (): Promise<JobDto[]> => {
  return await axios.get('/job');
};

export const useGetAllJobs = () => {
  return useQuery([QUERY_KEYS.jobs], getAllJobs);
};
