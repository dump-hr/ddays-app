import axios from 'axios';
import toast from 'react-hot-toast';
import { QueryOptions, useQuery } from 'react-query';

const achievementGetUuid = (id: number) => {
  return axios.get<never, string>(`/achievement/uuid/${id}`);
};

export const useAchievementGetUuid = (
  id?: number,
  options?: QueryOptions<string>,
) => {
  return useQuery([], () => achievementGetUuid(id!), {
    enabled: !!id,
    onSuccess: () => {
      toast.success('O.K.');
    },
    onError: () => {
      toast.error('ups');
    },
    ...options,
  });
};
