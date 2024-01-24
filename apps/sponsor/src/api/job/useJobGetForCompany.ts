import { JobDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const jobGetForCompany = (companyId: number) => {
  return api.get<never, JobDto[]>(`/job/company/${companyId}`);
};

export const useJobGetForCompany = (
  companyId?: number,
  options?: QueryOptions<JobDto[]>,
) => {
  return useQuery(['job', companyId], () => jobGetForCompany(companyId!), {
    enabled: !!companyId,
    ...options,
  });
};
