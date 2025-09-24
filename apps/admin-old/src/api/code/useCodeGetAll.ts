import { CodeDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const codeGetAll = () => {
  return api.get<never, CodeDto[]>('/code');
};

export const useCodeGetAll = (options?: QueryOptions<CodeDto[]>) => {
  return useQuery(['code'], codeGetAll, options);
};
