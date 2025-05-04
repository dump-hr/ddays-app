import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { JwtResponseDto, RegistrationDto } from '@ddays-app/types';

const registerUser = async (dto: Partial<RegistrationDto>) => {
  return axios.post<Partial<RegistrationDto>, JwtResponseDto>(
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
