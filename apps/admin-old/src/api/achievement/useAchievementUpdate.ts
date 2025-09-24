import { AchievementDto, AchievementModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const achievementUpdate = async (
  dto: AchievementModifyDto & { id: number },
) => {
  return await api.patch<AchievementModifyDto, AchievementDto>(
    `/achievement/${dto.id}`,
    {
      ...dto,
      id: undefined,
    },
  );
};

export const useAchievementUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(achievementUpdate, {
    onSuccess: (updatedAchievement) => {
      queryClient.invalidateQueries(['achievement']);
      queryClient.invalidateQueries(['achievement', updatedAchievement.id]);
      toast.success('Postignuće uspješno uređeno!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
