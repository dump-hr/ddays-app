import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import {
  CreateSurveyQuestionDto,
  SurveyQuestion,
} from '../../types/surveyQuestion';
import { api } from '..';

const createSurveyQuestion = async (
  surveyQuestion: CreateSurveyQuestionDto,
) => {
  const data = await api.post<CreateSurveyQuestionDto, SurveyQuestion>(
    `/survey-questions`,
    surveyQuestion,
  );

  return data;
};

export const useCreateSurveyQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(createSurveyQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['survey-question']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
