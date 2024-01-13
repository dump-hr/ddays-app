import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { CompanyDto, CreateCompanyDto } from '../../types/company';
import { api } from '..';

const createCompany = async (company: CreateCompanyDto) => {
  company.interests = company.interests.map((interest) => +interest);

  const data = await api.post<CreateCompanyDto, CompanyDto>(
    `/companies`,
    company,
  );

  return data;
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(createCompany, {
    onSuccess: () => {
      toast.success('Company created');
      queryClient.invalidateQueries(['company']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
