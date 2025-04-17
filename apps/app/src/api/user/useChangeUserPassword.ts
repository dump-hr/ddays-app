import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const changeUserPassword = async (data: { password: string }) => {
  return axios.post('/user/change-password', data);
};

export const useChangeUserPassword = () => {
  return useMutation(changeUserPassword, {
    onSuccess: () => {
      toast.success('Lozinka je uspješno promijenjena!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
