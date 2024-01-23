import { JobDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const jobsGetForCompany = (companyId: number) => {
  return api.get<never, JobDto[]>(`/job/company/${companyId}`);
};

export const useJobsGetForCompany = (
  companyId?: number,
  options?: QueryOptions<JobDto[]>,
) => {
  return useQuery(['job', companyId], () => jobsGetForCompany(companyId!), {
    enabled: !!companyId,
    ...options,
  });
};
