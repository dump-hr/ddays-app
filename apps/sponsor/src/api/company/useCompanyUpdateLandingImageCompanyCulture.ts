import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateLandingImageCompanyCulture = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  return await api.patchForm('/company/landing-image-company-culture', data);
};

export const useCompanyUpdateLandingImageCompanyCulture = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateLandingImageCompanyCulture, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Slika uspiješno uploadana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
