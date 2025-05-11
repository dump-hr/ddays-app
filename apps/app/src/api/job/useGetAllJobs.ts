import { QUERY_KEYS } from '@/constants/queryKeys';
import { JobDto } from '@ddays-app/types';
import axios from 'axios';
import { useQuery } from 'react-query';

const getAllJobs = async (): Promise<JobDto[]> => {
  const response = await axios.get(`/job`);
  return response.data;
};

export const useGetAllJobs = () => {
  return useQuery([QUERY_KEYS.jobs], () => getAllJobs());
};
