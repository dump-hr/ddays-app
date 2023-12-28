import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import { CreateSurveyQuestionDto } from '../../types/surveyQuestion';
import toast from 'react-hot-toast';

const createSurveyQuestion = async (
  surveyQuestion: CreateSurveyQuestionDto,
) => {
  const data = await api.post(`/survey-questions`, surveyQuestion);

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
      onError: (error: string) => {
        toast.error(error);
      },
    },
  );
};
