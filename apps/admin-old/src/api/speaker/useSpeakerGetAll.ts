import { SpeakerDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const speakerGetAll = () => {
  return api.get<never, SpeakerDto[]>('speaker');
};

export const useSpeakerGetAll = (options?: QueryOptions<SpeakerDto[]>) => {
  return useQuery(['speaker'], speakerGetAll, options);
};
