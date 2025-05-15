import { RatingQuestionDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const ratingQuestionsGetAll = () => {
  return axios.get<never, RatingQuestionDto[]>('/rating/questions');
};

export const useRatingQuestionsGetAll = (
  options?: QueryOptions<RatingQuestionDto[]>,
) => {
  return useQuery(['ratingQuestions'], ratingQuestionsGetAll, options);
};
