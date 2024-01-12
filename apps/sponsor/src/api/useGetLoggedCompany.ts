import { useQuery } from 'react-query';

import { api } from '.';

type Company = {
  id: number;
  name: string;
  description: string;
  sponsorCategory: string;
  websiteUrl: string;
  boothLocation: string;
  codeId: string;
  email: string;
  logoImage: string;
  landingImage: string;
};

const getLoggedCompany = async () =>
  await api.get<never, Company>('/company/logged');

export const useGetLoggedCompany = () => {
  return useQuery(['loggedCompany'], getLoggedCompany);
};
