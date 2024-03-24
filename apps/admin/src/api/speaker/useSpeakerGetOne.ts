import { SpeakerDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const speakerGetOne = async (id: number) => {
  return await api.get<never, SpeakerDto>(`/speaker/${id}`);
};

export const useSpeakerGetOne = (
  id?: number,
  options?: QueryOptions<SpeakerDto>,
) => {
  return useQuery(['speaker', id], () => speakerGetOne(id!), {
    enabled: !!id,
    ...options,
  });
};
