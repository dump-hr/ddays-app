import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { ChangeUserPasswordDto } from '@ddays-app/types/src/dto/user';

const changeUserPassword = async (data: ChangeUserPasswordDto) => {
  return axios.patch('/user/profile/change-password', data);
};

export const useChangeUserPassword = () => {
  return useMutation(changeUserPassword, {
    onSuccess: () => {
      toast.success('Lozinka je uspješno izmjenjena!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
