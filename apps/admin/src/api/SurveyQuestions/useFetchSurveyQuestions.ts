import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';
import { SurveyQuestionInputType, SurveyQuestionType } from '@ddays-app/types';

type SurveyQuestion = {
  id: number;
  question: string;
  description: string;
  inputLabel: string;
  surveyQuestionInputType: SurveyQuestionInputType;
  surveyQuestionType: SurveyQuestionType;
};

const fetchAllSurveyQuestions = async () =>
  await api.get<
    never,
    {
      id: number;
      question: string;
      description: string;
      inputLabel: string;
      surveyQuestionInputType: SurveyQuestionInputType;
      surveyQuestionType: SurveyQuestionType;
    }[]
  >('/survey-questions');

export const useFetchSurveyQuestions = (
  options?: QueryOptions<SurveyQuestion[]>,
) => {
  return useQuery(['survey-question'], fetchAllSurveyQuestions, options);
};