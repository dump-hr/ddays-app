import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { AchievementDto } from '@ddays-app/types';
import RedStarIcon from '@/components/RedStarIcon';

const achievementCompleteByName = (name: string) => {
  const url = `/achievement/complete-by-name/${encodeURIComponent(name)}`;

  return axios.post<string, AchievementDto>(url);
};

export const useAchievementCompleteByName = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AchievementDto,
    Error,
    { name: string; suppressDuplicate?: boolean }
  >(
    [QUERY_KEYS.achievements, QUERY_KEYS.achievementCompleted],
    ({ name }) => {
      return achievementCompleteByName(name);
    },
    {
      onSuccess: (_, { name }) => {
        void queryClient.invalidateQueries([
          QUERY_KEYS.achievements,
          QUERY_KEYS.achievementCompleted,
        ]);

        void queryClient.invalidateQueries([QUERY_KEYS.leaderboard]);
        void queryClient.invalidateQueries([QUERY_KEYS.leaderboardUserRank]);

        toast.success(`Dodano postignuće - ${name}`, {
          icon: <RedStarIcon />,
          style: {
            width: 'max-content',
            maxWidth: '90vw',
            whiteSpace: 'nowrap',
          },
          duration: 3000,
          position: 'top-center',
        });
      },
    },
  );
};
