import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { CompanyDto, UpdateCompanyDto } from '../../types/company';
import { api } from '..';

const updateCompany = async (req: {
  id: number;
  company: UpdateCompanyDto;
}) => {
  req.company.interests = req.company.interests?.map((interest) => +interest);

  const data = await api.patch<UpdateCompanyDto, CompanyDto>(
    `/companies/${req.id}`,
    req.company,
  );

  return data;
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCompany, {
    onSuccess: () => {
      toast.success('Company updated');
      queryClient.invalidateQueries(['company']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
