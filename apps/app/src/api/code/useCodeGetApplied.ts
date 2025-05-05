import { CodeDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const codeGetApplied = () => {
  return axios.get<never, CodeDto[]>('/code/applied');
};

export const useCodeGetApplied = (options?: QueryOptions<CodeDto[]>) => {
  return useQuery([QUERY_KEYS.codeApplied], codeGetApplied, options);
};
