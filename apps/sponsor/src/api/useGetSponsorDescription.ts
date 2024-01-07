import { useQuery } from 'react-query';

import { SponsorDescriptionDto } from '../types/company';
import { api } from '.';

const getSponsorDescription = async () =>
  await api.get<never, SponsorDescriptionDto>('/company/description');

export const useGetSponsorDescription = () => {
  return useQuery(['sponsorDescription'], getSponsorDescription);
};
