import { useQuery } from 'react-query';

import { SponsorFormStatusDto } from '../types/form';
import { api } from '.';

const getSponsorFormStatus = async () =>
  await api.get<never, SponsorFormStatusDto>('/company/sponsorFormStatus');

export const useGetSponsorFormStatus = () => {
  return useQuery(['sponsorFormStatus'], getSponsorFormStatus);
};
