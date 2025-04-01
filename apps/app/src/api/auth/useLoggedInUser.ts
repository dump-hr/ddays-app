import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserDto } from '@ddays-app/types/src/dto/user';

const getLoggedInUser = async () => {
  return axios.get<never, Partial<UserDto>>('/auth/user/authenticated');
};

export const useLoggedInUser = () => {
  return useQuery([QUERY_KEYS.login], getLoggedInUser);
};
