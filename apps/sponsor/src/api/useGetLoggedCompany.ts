import { useQuery } from 'react-query';

import { api } from '.';

/*
 {id: company.id,
  name: company.name,
  description: company.description,
  sponsorCategory: company.sponsorCategory,
  websiteUrl: company.websiteUrl,
  boothLocation: company.boothLocation,
  codeId: company.codeId,
  email: company.email,
  logoImage: company.logoImage,
  landingImage: company.landingImage,}*/

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
