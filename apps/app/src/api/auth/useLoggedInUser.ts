import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserPublicDto } from '@/types/user/user';

const getLoggedInUser = async () => {
  return axios.get<never, UserPublicDto>('/auth/user/authenticated');
};

export const useLoggedInUser = () => {
  return useQuery([QUERY_KEYS.login], getLoggedInUser);
};
