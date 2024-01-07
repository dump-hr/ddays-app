import { FrequentlyAskedQuestion } from '@ddays-app/types/src/model/frequentlyAskedQuestion';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllFrequentlyAskedQuestions = async () =>
  await api.get<never, FrequentlyAskedQuestion[]>('/faq');

export const useFetchAllFrequentlyAskedQuestions = () => {
  return useQuery(['faq'], fetchAllFrequentlyAskedQuestions);
};
