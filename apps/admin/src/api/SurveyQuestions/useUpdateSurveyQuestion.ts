import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import { UpdateSurveyQuestionDto } from '../../types/surveyQuestionDto';

const updateSurveyQuestion = async (
  id: number,
  surveyQuestion: UpdateSurveyQuestionDto,
) => {
  const { data } = await api.patch(`/survey-questions/${id}`, surveyQuestion);

  return data;
};

export const useUpdateSurveyQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { id: number; surveyQuestion: UpdateSurveyQuestionDto }) =>
      updateSurveyQuestion(data.id, data.surveyQuestion),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['updateSurveyQuestion', data.id]);
      },
    },
  );
};
