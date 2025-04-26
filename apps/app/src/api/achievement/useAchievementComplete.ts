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
    (uuid: string) => achievementComplete(uuid), // Pass uuid here
    {
      onSuccess: () => {
        toast.success('Postignuće je uspješno dodano!');
      },
    },
  );
};
