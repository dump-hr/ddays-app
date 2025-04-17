import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const deleteCurrentUser = async () => {
  return axios.delete('/user/profile');
};

export const useDeleteAccount = () => {
  return useMutation(deleteCurrentUser, {
    onSuccess: () => {
      toast.success('Profil je uspješno obrisan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
