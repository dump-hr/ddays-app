import axios from './axios';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserDto } from '@ddays-app/types/src/dto/user';
import toast from 'react-hot-toast';

const registerUser = async (user: Partial<UserDto>) => {
  return axios.post('/auth/user/register', user);
};

export const useUserRegister = () => {
  return useMutation(
    [QUERY_KEYS.register],
    (user: Partial<UserDto>) => registerUser(user),
    {
      onSuccess: (data) => {
        toast.success('Login successful!');
      },
      onError: (error) => {
        console.error('Login failed', error);
      },
    },
  );
};
