import { BoothPublicDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

export const getBooths = async () => {
  return await api.get<never, BoothPublicDto[]>('/booth/company');
};

export const useGetBooths = () => {
  return useQuery(['booth'], getBooths);
};
