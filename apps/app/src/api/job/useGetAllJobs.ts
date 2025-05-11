import { QUERY_KEYS } from '@/constants/queryKeys';
import { JobDto } from '@ddays-app/types';
import { useQuery } from 'react-query';
import axios from '../base';
const getAllJobs = async (): Promise<JobDto[]> => {
  const response = await axios.get(`/job`);
  console.log('response.data', response.data);
  return response.data;
};

export const useGetAllJobs = () => {
  return useQuery([QUERY_KEYS.jobs], getAllJobs);
};
