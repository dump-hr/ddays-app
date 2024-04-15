import { FrequentlyAskedQuestionDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const frequentlyAskedQuestionGetAll = () => {
  return api.get<never, FrequentlyAskedQuestionDto[]>('/faq');
};

export const useFrequentlyAskedQuestionGetAll = (
  options?: QueryOptions<FrequentlyAskedQuestionDto[]>,
) => {
  return useQuery(['faq'], frequentlyAskedQuestionGetAll, options);
};
