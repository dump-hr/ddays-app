import { useQuery } from 'react-query';

import { NotificationDto } from '../types/notification';
import { api } from '.';
import { SponsorFormStatusDto } from '../types/form';

const fetchCompany = async () =>
  await api.get<never, SponsorFormStatusDto[]>('/companies/sponsor-data');

export const useFetchCompany = () => {
  return useQuery(['company'], fetchCompany, {
    staleTime: Infinity,
    retry: false,
  });
};
