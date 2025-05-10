import { CodeDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const codeGetByValue = (value: string) => {
  return axios.get<never, CodeDto>('/code/get/' + value);
};

export const useCodeGetByValue = (
  value: string,
  options?: QueryOptions<CodeDto>,
) => {
  return useQuery(
    [QUERY_KEYS.achievementCompleted],
    () => codeGetByValue(value),
    {
      enabled: !!value,
      ...options,
    },
  );
};
