import {
  AchievementCreateReqDto,
  AchievementCreateResDto,
} from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const achievementCreate = async (dto: AchievementCreateReqDto) => {
  return api.post<AchievementCreateReqDto, AchievementCreateResDto>(
    '/achievement',
    dto,
  );
};

export const useAchievementCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(achievementCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['achievement']);
      toast.success('Achievement uspješno dodan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
