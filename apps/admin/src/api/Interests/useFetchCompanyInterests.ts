import { QueryOptions, useQuery } from 'react-query';

import { InterestDto } from '../../types/interest';
import { api } from '..';

const fetchCompanyInterests = async (id: number) =>
  await api.get<never, InterestDto[]>(`/companies/${id}/interests`);

export const useFetchCompanyInterests = (
  id: number,
  options?: QueryOptions<InterestDto[]>,
) => {
  return useQuery(
    ['companyInterests', id],
    () => fetchCompanyInterests(id),
    options,
  );
};
