import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { AchievementDto } from '@ddays-app/types';

const achievementComplete = (uuid: string) => {
  return axios.post<string, AchievementDto>(`/achievement/complete/${uuid}`);
};

export const useAchievementComplete = () => {
  const queryClient = useQueryClient();
  return useMutation<AchievementDto, Error, string>(
    [QUERY_KEYS.achievements, QUERY_KEYS.achievementCompleted],
    (uuid: string) => achievementComplete(uuid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: () => {
        toast.error('Došlo je do greške prilikom dodavanja postignuća!', {
          position: 'top-center',
        });
      },
    },
  );
};
