import { useQuery } from 'react-query';

import { SponsorInterestDto } from '../types/interest';
import { api } from '.';

const getSponsorInterest = async () =>
  await api.get<never, SponsorInterestDto[]>('/interests/sponsor');

export const useGetSponsorInterest = () => {
  return useQuery(['sponsorInterest'], getSponsorInterest);
};
