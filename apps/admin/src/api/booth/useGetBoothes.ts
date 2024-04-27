import { AdminBoothDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const getBoothes = async () => {
  return await api.get<never, AdminBoothDto[]>('/booth');
};

export const useGetBoothes = () => {
  return useQuery('booths', getBoothes);
};
