import { CodeDto, CodeModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const codeUpdate = async (dto: CodeModifyDto & { id: number }) => {
  return await api.patch<CodeModifyDto, CodeDto>(`/code/${dto.id}`, {
    ...dto,
    id: undefined,
  });
};

export const useCodeUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(codeUpdate, {
    onSuccess: (updatedCode) => {
      queryClient.invalidateQueries(['code']);
      queryClient.invalidateQueries(['code', updatedCode.id]);
      toast.success('Kod uspješno uređen!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
