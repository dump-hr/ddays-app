import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { JwtResponseDto } from '@ddays-app/types';

type LoginDto = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginDto) => {
  return axios.post<LoginDto, JwtResponseDto>('/auth/user/login', {
    email,
    password,
  });
};

export const useUserLogin = (navigate: () => void) => {
  return useMutation([QUERY_KEYS.login], loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      toast.success('Login successful!');
      navigate();
    },
    onError: () => {
      toast.error('Login failed');
    },
  });
};
