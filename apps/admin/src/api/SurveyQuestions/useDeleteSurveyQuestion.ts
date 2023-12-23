import { useMutation, useQueryClient } from 'react-query';
import { api } from '..';

const deleteSurveyQuestion = async (id: number) => {
  const data = await api.delete(`/survey-questions/${id}`);

  return data;
};

export const useDeleteSurveyQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSurveyQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['survey-question']);
    },
  });
};
