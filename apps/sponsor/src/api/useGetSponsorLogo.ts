import { useQuery } from 'react-query';

import { SponsorLogoDto } from '../types/company';
import { api } from '.';

const getSponsorLogo = async () => {
  return await api.get<never, SponsorLogoDto>(`/companies/logo`);
};

export const useGetSponsorLogo = () => {
  return useQuery(['sponsorLogo'], getSponsorLogo);
};
