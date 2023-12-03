import { QueryOptions, useQuery } from 'react-query';
import { api } from '.';

const fetchAllAchievements = async () =>
  await api.get<never, { name: string; description: string; points: number }[]>(
    '/achievement',
  );

export const useFetchAchievements = (
  options?: QueryOptions<
    { name: string; description: string; points: number }[]
  >,
) => {
  return useQuery(['achievement'], fetchAllAchievements, options);
};
