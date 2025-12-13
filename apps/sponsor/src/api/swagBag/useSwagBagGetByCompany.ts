import { SwagBagDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const swagBagGetByCompany = (companyId: number) => {
  return api.get<never, SwagBagDto[]>(`/swag-bag/company/${companyId}`);
};

export const useSwagBagGetByCompany = (
  companyId?: number,
  options?: QueryOptions<SwagBagDto[]>,
) => {
  return useQuery(
    ['swag-bag', companyId],
    () => swagBagGetByCompany(companyId!),
    {
      enabled: !!companyId,
      ...options,
    },
  );
};
