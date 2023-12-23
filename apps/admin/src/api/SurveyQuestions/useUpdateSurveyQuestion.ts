import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import { UpdateSurveyQuestionDto } from '../../types/surveyQuestionDto';

type SurveyQuestion = {
  id: number;
  question: string;
  description: string;
  inputLabel: string;
  surveyQuestionInputType: string;
  surveyQuestionType: string;
};

const updateSurveyQuestion = async (req: {
  id: number;
  surveyQuestion: UpdateSurveyQuestionDto;
}) => {
  const data = await api.patch<UpdateSurveyQuestionDto, SurveyQuestion>(
    `/survey-questions/${req.id}`,
    req.surveyQuestion,
  );

  return data;
};

export const useUpdateSurveyQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(updateSurveyQuestion, {
    onSuccess: (data) => {
      console.log('mutation', data);
      queryClient.invalidateQueries(['survey-question']);
    },
  });
};
