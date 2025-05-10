import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const updateAchievements = async ({
  codeId,
  achievementIds,
}: {
  codeId: number;
  achievementIds: number[];
}) => {
  return api.post(`/code/update-achievements/${codeId}`, achievementIds);
};

export const useCodeUpdateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation(updateAchievements, {
    onSuccess: () => {
      queryClient.invalidateQueries(['code', 'achievement']);
      toast.success('Kod uspješno povezan s postignućem!');
    },
  });
};
