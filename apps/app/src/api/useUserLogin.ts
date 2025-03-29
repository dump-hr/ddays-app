import axios from './axios';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import toast from 'react-hot-toast';

type LoginDto = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginDto) => {
  return axios.post('/auth/user/login', { email, password });
};

export const useUserLogin = () => {
  return useMutation([QUERY_KEYS.login], (body: LoginDto) => loginUser(body), {
    onSuccess: (data) => {
      console.log(data);
      toast.success('Login successful!');
    },
    onError: (error) => {
      console.error('Login failed', error);
    },
  });
};
