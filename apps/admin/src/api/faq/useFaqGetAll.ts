import { FrequentlyAskedQuestionDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const faqGetAll = () => {
  return api.get<never, FrequentlyAskedQuestionDto[]>('/faq');
};

export const useFaqGetAll = (
  options?: QueryOptions<FrequentlyAskedQuestionDto[]>,
) => {
  return useQuery(['faq'], faqGetAll, options);
};
