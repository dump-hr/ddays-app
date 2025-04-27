import { useMutation, useQueryClient } from 'react-query';
import { api } from '..';
import toast from 'react-hot-toast';

const rewardUpdateImage = async (rewardFile: {
  id: number | undefined;
  file: File;
}) => {
  const data = new FormData();
  data.append('file', rewardFile.file);

  return await api.patchForm(`/reward/photo/${rewardFile.id}`, data);
};

export const useRewardUpdateImage = () => {
  const queryClient = useQueryClient();

  return useMutation(rewardUpdateImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reward']);
      toast.success('Slika uspiješno uploadana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
