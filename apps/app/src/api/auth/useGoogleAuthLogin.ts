import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { JwtResponseDto, RegistrationDto } from '@ddays-app/types';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@/router/routes';

const googleLogin = async (token: string) => {
  return axios.post<string, JwtResponseDto | RegistrationDto>('/auth/google', {
    token,
  });
};

export const useGoogleAuthLogin = () => {
  const navigate = useNavigate();
  return useMutation([QUERY_KEYS.googleLogin], googleLogin, {
    onSuccess: (data) => {
      if ('accessToken' in data) {
        localStorage.setItem('accessToken', data.accessToken);
        toast.success('Prijava je uspješna!');
        navigate(RouteNames.HOME);
      } else {
        navigate(RouteNames.REGISTER, {
          state: { startStep: 2, userData: data, googleAuth: true },
        });
      }
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
