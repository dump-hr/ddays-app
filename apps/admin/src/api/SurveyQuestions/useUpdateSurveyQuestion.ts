import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import {
  SurveyQuestion,
  UpdateSurveyQuestionDto,
} from '../../types/surveyQuestion';
import toast from 'react-hot-toast';

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
    onSuccess: () => {
      queryClient.invalidateQueries(['survey-question']);
    },
    onError: () => {
      toast.error("Couldn't update survey question");
    },
  });
};
