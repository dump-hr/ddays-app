import { QueryOptions, useQuery } from 'react-query';

import { SurveyQuestion } from '../../types/surveyQuestion';
import { api } from '..';

const fetchAllSurveyQuestions = async () =>
  await api.get<never, SurveyQuestion[]>('/survey-questions');

export const useFetchSurveyQuestions = (
  options?: QueryOptions<SurveyQuestion[]>,
) => {
  return useQuery(['survey-question'], fetchAllSurveyQuestions, options);
};
