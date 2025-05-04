import { QUERY_KEYS } from '@/constants/queryKeys';
import { InterestDto } from '@ddays-app/types';
import axios from 'axios';
import { useQuery } from 'react-query';

const interestsGetAll = async (): Promise<InterestDto[]> => {
  const response = await axios.get(`/api/interest/`);
  return response.data;
};

export const useInterestsGetAll = () => {
  return useQuery([QUERY_KEYS.interests], interestsGetAll);
};
