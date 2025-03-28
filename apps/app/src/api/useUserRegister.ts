import axios from 'axios';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserDto } from '@ddays-app/types/src/dto/user';

const registerUser = async (user: UserDto) => {
  return axios.post('/auth/user/register', user);
};

export const useUserRegister = (user: UserDto) => {
  return useQuery([QUERY_KEYS.register], () => registerUser(user), {
    enabled: !!user,
  });
};
