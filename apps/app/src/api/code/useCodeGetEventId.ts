import { CodeDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const codeGetEventId = (code: string) => {
  return axios.get<never, CodeDto[]>(`/code/${code}/eventId`);
};

export const useCodeGetEventId = (
  code: string,
  options?: QueryOptions<CodeDto[]>,
) => {
  return useQuery(
    [QUERY_KEYS.codeEventId, code],
    () => codeGetEventId(code),
    options,
  );
};
