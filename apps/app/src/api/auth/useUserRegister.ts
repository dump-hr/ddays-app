import axios from '../base';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserDto } from '@ddays-app/types/src/dto/user';
import toast from 'react-hot-toast';

const registerUser = async (dto: Partial<UserDto>) => {
  return axios.post('/auth/user/register', dto);
};

export const useUserRegister = () => {
  return useMutation(
    [QUERY_KEYS.register],
    (dto: Partial<UserDto>) => registerUser(dto),
    {
      onSuccess: (data) => {
        console.log(data);
        toast.success('Login successful!');
      },
      onError: (error) => {
        console.error('Login failed', error);
      },
    },
  );
};
