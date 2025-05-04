import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserDto } from '@ddays-app/types/src/dto/user';
import { JwtResponseDto } from '@ddays-app/types';

const registerUser = async (dto: Partial<UserDto>) => {
  return axios.post<Partial<UserDto>, JwtResponseDto>(
    '/auth/user/register',
    dto,
  );
};

export const useUserRegister = (navigate: () => void) => {
  return useMutation([QUERY_KEYS.register], registerUser, {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      //toast.success('Registracija je uspješna!');
      navigate();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
