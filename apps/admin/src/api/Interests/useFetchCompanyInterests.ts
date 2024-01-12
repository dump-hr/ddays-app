import { QueryOptions, useQuery } from 'react-query';

import { InterestDto } from '../../types/interest';
import { api } from '..';

const fetchCompanyInterests = async (id: number | undefined) => {
  if (!id) return [];
  return await api.get<never, InterestDto[]>(`/companies/${id}/interests`);
};

export const useFetchCompanyInterests = (
  id: number | undefined,
  options?: QueryOptions<InterestDto[]>,
) => {
  return useQuery(
    ['companyInterests', id],
    () => fetchCompanyInterests(id),
    options,
  );
};
