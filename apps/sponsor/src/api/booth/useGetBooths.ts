import { BoothDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

export const getBooths = async () => {
  const res = await api.get<never, BoothDto[]>('/company/booth');
  console.log(res);
  return res;
};

export const useGetBooths = () => {
  return useQuery(['company', 'booth'], getBooths);
};
