import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { UserModifyDto } from '@ddays-app/types/src/dto/user';

const patchCurrentUser = async (data: UserModifyDto) => {
  return axios.patch('/user/profile', data);
};

export const usePatchCurrentUser = () => {
  return useMutation(patchCurrentUser, {
    onSuccess: () => {
      toast.success('Profil je uspješno ažuriran!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
