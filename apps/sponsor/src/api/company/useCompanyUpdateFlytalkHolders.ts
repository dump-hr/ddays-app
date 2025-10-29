import { CompanyModifyFlyTalkHoldersDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateFlyTalkHolders = async (
  dto: CompanyModifyFlyTalkHoldersDto,
) => {
  return await api.patch<CompanyModifyFlyTalkHoldersDto, never>(
    '/company/flytalk-holders',
    dto,
  );
};

export const useCompanyUpdateFlyTalkHolders = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateFlyTalkHolders, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('FlyTalk holders podaci uspješno spremljeni');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
