import { CodeDto, CodeModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const codeCreate = async (dto: CodeModifyDto) => {
  return api.post<CodeModifyDto, CodeDto>('/code', dto);
};

export const useCodeCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(codeCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['code']);
      toast.success('Kod uspješno dodan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
