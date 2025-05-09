import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { JwtResponseDto, RegistrationDto } from '@ddays-app/types';
import RedStarIcon from '@/components/RedStarIcon';

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
      toast.success('Dodano postignuće - First Steps!', {
        icon: <RedStarIcon />,
        duration: 3000,
        position: 'top-center',
      });

      const EARLY_BIRD_CUTOFF = new Date('2025-05-09T22:00:00.000Z'); // 10.5.2024 00:00 CEST
      const currentTime = new Date();

      if (currentTime < EARLY_BIRD_CUTOFF) {
        toast.success('Dodano postignuće - Early Bird!', {
          icon: <RedStarIcon />,
          duration: 3000,
          position: 'top-center',
        });
      }

      navigate();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
