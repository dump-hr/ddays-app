import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { UserModifyDto } from '@ddays-app/types/src/dto/user';
import { QUERY_KEYS } from '@/constants/queryKeys';

const updateUser = async (user: UserModifyDto) => {
  return axios.patch<UserModifyDto>('/auth/user/authenticated', user);
};

export const useUpdateCurrentUser = () => {
  return useMutation([QUERY_KEYS.updateUser], updateUser, {
    onSuccess: () => {
      toast.success('Ažuriranje korisnika je uspješno!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
