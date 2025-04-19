import axios from '../base';
import router from '@/router/Router';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { RouteNames } from '@/router/routes';

const deleteCurrentUser = async () => {
  return axios.patch('/user/profile/delete');
};

export const useDeleteAccount = () => {
  return useMutation(deleteCurrentUser, {
    onSuccess: () => {
      toast.success('Račun je uspješno obrisan!');
      localStorage.removeItem('accessToken');
      router.navigate(RouteNames.LOGIN);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
