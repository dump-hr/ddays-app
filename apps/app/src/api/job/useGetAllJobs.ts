import { QUERY_KEYS } from '@/constants/queryKeys';
import { JobDto } from '@ddays-app/types';
import { useQuery } from 'react-query';
import axios from '../base';
const getAllJobs = async (): Promise<JobDto[]> => {
  return await axios.get(`/job`);
};

export const useGetAllJobs = () => {
  return useQuery([QUERY_KEYS.jobs], getAllJobs);
};
