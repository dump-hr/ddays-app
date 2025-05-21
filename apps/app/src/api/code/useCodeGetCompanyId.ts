import { CodeDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const codeGetCompanyId = (code: string) => {
  return axios.get<never, CodeDto[]>(`/code/${code}/companyId`);
};

export const useCodeGetCompanyId = (
  code: string,
  options?: QueryOptions<CodeDto[]>,
) => {
  return useQuery(
    [QUERY_KEYS.codeCompanyId, code],
    () => codeGetCompanyId(code),
    options,
  );
};
