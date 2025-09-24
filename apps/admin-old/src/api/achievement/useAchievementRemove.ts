import { AchievementDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const achievementRemove = async (id: number) => {
  return await api.delete<never, AchievementDto>(`/achievement/${id}`);
};

export const useAchievementRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(achievementRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['achievement']);
      toast.success('Postignuće uspješno uklonjeno!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
