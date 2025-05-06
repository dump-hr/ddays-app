import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { AchievementDto } from '@ddays-app/types';
import RedStarIcon from '@/components/RedStarIcon';

const achievementCompleteByName = (
  name: string,
  suppressDuplicate: boolean = false,
) => {
  const url = `/achievement/complete-by-name/${encodeURIComponent(name)}`;

  const finalUrl = `${url}?suppressDuplicate=${suppressDuplicate}`;

  return axios.post<string, AchievementDto>(finalUrl);
};

export const useAchievementCompleteByName = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AchievementDto,
    Error,
    { name: string; suppressDuplicate?: boolean }
  >(
    [QUERY_KEYS.achievements, QUERY_KEYS.achievementCompleted],
    ({ name, suppressDuplicate = false }) => {
      return achievementCompleteByName(name, suppressDuplicate);
    },
    {
      onSuccess: (_, { name }) => {
        queryClient.invalidateQueries([
          QUERY_KEYS.achievements,
          QUERY_KEYS.achievementCompleted,
        ]);

        toast.success(`Dodano postignuće - ${name}`, {
          icon: <RedStarIcon />,
          style: {
            width: 'max-content',
            maxWidth: '90vw',
            whiteSpace: 'nowrap',
          },
        });
      },
      onError: (error) => {
        console.error('Achievement error:', error);
      },
    },
  );
};
