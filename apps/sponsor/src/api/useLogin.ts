import { JwtResponse, LoginRequest } from '@ddays-app/types';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const login = (data: LoginRequest) =>
  api.post<never, JwtResponse>('/auth/login/sponsor', data);

export const useLogin = (navigate: () => void) => {
  return useMutation(login, {
    onMutate: () => {
      return { toastId: toast.loading('Logging in...') };
    },
    onSuccess: ({ access_token }, _variables, context) => {
      localStorage.setItem('access_token', access_token);
      toast.success('Logged in successfully!', { id: context?.toastId });

      navigate();
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
