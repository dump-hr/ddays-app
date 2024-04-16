import { SpeakerWithCompanyDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const speakerWithCompanyGetAll = () => {
  return api.get<never, SpeakerWithCompanyDto[]>('speaker/with-company');
};

export const useSpeakerWithCompanyGetAll = (
  options?: QueryOptions<SpeakerWithCompanyDto[]>,
) => {
  return useQuery(['speaker/with-company'], speakerWithCompanyGetAll, options);
};
