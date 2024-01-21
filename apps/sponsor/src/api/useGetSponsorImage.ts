import { useQuery } from 'react-query';

import { SponsorLogoDto } from '../types/company';
import { api } from '.';

const getSponsorImage = async () => {
  return await api.get<never, SponsorLogoDto>(`/companies/logo`);
};

export const useGetSponsorImage = (sponsorId: string) => {
  return useQuery(['sponsorImage', sponsorId], getSponsorImage);
};
