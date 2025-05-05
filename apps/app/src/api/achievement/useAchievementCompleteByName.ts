import axios from '../base';
import toast from 'react-hot-toast';
import { QueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { AchievementDto } from '@ddays-app/types';

const achievementCompleteByName = (name: string) => {
  return axios.post<string, AchievementDto>(
    `/achievement/complete-by-name/${encodeURIComponent(name)}`,
  );
};

export const useAchievementCompleteByName = () => {
  const queryClient = new QueryClient();
  return useMutation<AchievementDto, Error, string>(
    [QUERY_KEYS.achievements, QUERY_KEYS.achievementCompleted],
    (name: string) => achievementCompleteByName(name),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QUERY_KEYS.achievements,
          QUERY_KEYS.achievementCompleted,
        ]);
      },
      onError: () => {
        toast.error('Došlo je do greške prilikom dodavanja postignuća!', {
          position: 'top-center',
        });
      },
    },
  );
};
