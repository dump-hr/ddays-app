import { CompanyPublicDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

export const getAllSponsors = () => {
  return api.get<never, CompanyPublicDto[]>('/company');
};

export const useGetAllSponsors = () => {
  return useQuery('sponsorImages', getAllSponsors);
};
