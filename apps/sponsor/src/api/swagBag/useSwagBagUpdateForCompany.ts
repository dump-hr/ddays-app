import { SwagBagModifyToCompanyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const swagBagUpdateForCompany = async (
  companyId: number,
  swagBags: SwagBagModifyToCompanyDto[],
) => {
  return await api.patch<{
    companyId: number;
    swagBags: SwagBagModifyToCompanyDto[];
  }>('/swag-bag/company', { companyId, swagBags });
};

export const useSwagBagUpdateForCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      companyId,
      swagBags,
    }: {
      companyId: number;
      swagBags: SwagBagModifyToCompanyDto[];
    }) => swagBagUpdateForCompany(companyId, swagBags),
    {
      onMutate: () => {
        return { toastId: toast.loading('Spremam swag bagove...') };
      },
      onSuccess: (_data, _variables, context) => {
        queryClient.invalidateQueries(['swag-bag']);
        queryClient.invalidateQueries(['company', 'current']);

        toast.success('Swag bagovi tvrtke uspješno spremljeni', {
          id: context?.toastId,
        });
      },
      onError: (error: string, _variables, context) => {
        toast.error(error, { id: context?.toastId });
      },
    },
  );
};
