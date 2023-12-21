import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import { CreateSurveyQuestionDto } from '../../types/surveyQuestionDto';

const createSurveyQuestion = async (
  surveyQuestion: CreateSurveyQuestionDto,
) => {
  const { data } = await api.post(`/survey-questions`, surveyQuestion);

  return data;
};

export const useCreateSurveyQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateSurveyQuestionDto) => createSurveyQuestion(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['survey-question']);
      },
    },
  );
};
