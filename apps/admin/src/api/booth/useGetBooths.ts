import { AdminBoothDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const getBooths = async () => {
  return await api.get<never, AdminBoothDto[]>('/booth');
};

export const useGetBooths = () => {
  return useQuery(['booth'], getBooths);
};