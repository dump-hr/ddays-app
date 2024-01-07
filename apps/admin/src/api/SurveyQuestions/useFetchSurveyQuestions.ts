import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';
import { SurveyQuestion } from '../../types/surveyQuestion';

const fetchAllSurveyQuestions = async () =>
  await api.get<never, SurveyQuestion[]>('/survey-questions');

export const useFetchSurveyQuestions = (
  options?: QueryOptions<SurveyQuestion[]>,
) => {
  return useQuery(['survey-question'], fetchAllSurveyQuestions, options);
};
