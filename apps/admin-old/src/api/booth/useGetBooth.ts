import { BoothDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

export const getBooth = async (id: number) => {
  return await api.get<BoothDto>(`/booth/${id}`);
};

export const useGetBooth = (id?: number) => {
  return useQuery(['booth', id], () => getBooth(id!), { enabled: !!id });
};
