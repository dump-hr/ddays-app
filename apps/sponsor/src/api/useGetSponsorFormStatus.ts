import { useQuery } from 'react-query';

import { SponsorFormStatusDto } from '../types/form';
import { api } from '.';

const getSponsorFormStatus = async () =>
  await api.get<never, SponsorFormStatusDto>('/companies/sponsorFormStatus');

export const useGetSponsorFormStatus = () => {
  return useQuery(['sponsorFormStatus'], getSponsorFormStatus);
};
