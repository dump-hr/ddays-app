import { useQuery } from 'react-query';

import { SponsorJobDto } from '../types/company';
import { api } from '.';

const getSponsorJobs = async (id: number) =>
  await api.get<never, SponsorJobDto[]>(`/jobs/${id}`);

export const useGetSponsorJobs = (id: number | undefined) => {
  return useQuery(['sponsorJobs', id], () => getSponsorJobs(id as number));
};
