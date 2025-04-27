import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { AchievementDto } from '@ddays-app/types';

const achievementComplete = (uuid: string) => {
  return axios.post<string, AchievementDto>(`/achievement/complete/${uuid}`);
};

export const useAchievementComplete = () => {
  return useMutation<AchievementDto, Error, string>(
    [QUERY_KEYS.achievements, QUERY_KEYS.achievementCompleted],
    (uuid: string) => achievementComplete(uuid),
    {
      onSuccess: () => {
        toast.success('Postignuće je uspješno dodano!');
      },
      onError: () => {
        toast.error('Došlo je do greške prilikom dodavanja postignuća!');
      },
    },
  );
};
