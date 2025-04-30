import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { ResetUserPasswordDto } from '@ddays-app/types/src/dto/user';

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
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Greška pri resetiranju lozinke';
      toast.error(errorMessage);
    },
  });
};
