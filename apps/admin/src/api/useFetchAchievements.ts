import { useQuery } from 'react-query';
import { api } from '.';

const fetchAllAchievements = async () =>
  await api.get<never, { name: string; description: string; points: number }[]>(
    '/achievement',
  );

export const useFetchAchievements = () => {
  return useQuery(['achievement'], fetchAllAchievements);
};
