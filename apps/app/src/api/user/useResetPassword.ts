import axios from '../base';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { ResetUserPasswordDto } from '@ddays-app/types/src/dto/user';

type ErrorResponse = {
  message: string;
};

const resetPassword = async (
  data: ResetUserPasswordDto & { token: string },
) => {
  return axios.post('/user/reset-password', data);
};

export const useResetPassword = () => {
  return useMutation(resetPassword, {
    onSuccess: () => {
      toast.success('Lozinka je uspješno resetirana!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error?.response?.data?.message || 'Greška pri resetiranju lozinke';
      toast.error(errorMessage);
    },
  });
};
