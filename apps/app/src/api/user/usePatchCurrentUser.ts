import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { UserModifyDto } from '@ddays-app/types/src/dto/user';
import { QUERY_KEYS } from '@/constants/queryKeys';

const patchCurrentUser = async (data: Partial<UserModifyDto>) => {
  return axios.patch('/user/profile', data);
};

export const usePatchCurrentUser = () => {
  const queryClient = useQueryClient();
  return useMutation(patchCurrentUser, {
    onSuccess: () => {
      toast.success('Profil je uspješno ažuriran!');
      void queryClient.invalidateQueries([QUERY_KEYS.currentUser]);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
