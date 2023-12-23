import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';
import { CreateSurveyQuestionDto } from '../../types/surveyQuestionDto';
import toast from 'react-hot-toast';

const createSurveyQuestion = async (
  surveyQuestion: CreateSurveyQuestionDto,
) => {
  const data = await api.post(`/survey-questions`, surveyQuestion);

  console.log('api', data);

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
      onError: (error) => {
        toast.error("Couldn't create survey question");
      },
    },
  );
};
