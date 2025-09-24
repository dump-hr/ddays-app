import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const getUserCount = () => {
  return api.get<never, number>('user/count');
};

export const useGetUserCount = (options?: QueryOptions<number>) => {
  return useQuery(['userCount'], getUserCount, options);
};
