import { useMutation, useQueryClient } from 'react-query';
import { api } from '..';
import toast from 'react-hot-toast';

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
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
