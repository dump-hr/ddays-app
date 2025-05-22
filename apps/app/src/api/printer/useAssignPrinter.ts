import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../base';

const assignPrinter = ({
  printerId,
  userId,
}: {
  printerId: number;
  userId: number;
}) => {
  return axios.post('/printers/assign', {
    printerId,
    userId,
  });
};

export const useAssignPrinter = () => {
  const queryClient = useQueryClient();

  return useMutation(assignPrinter, {
    onSuccess: (_, { printerId }) => {
      queryClient.invalidateQueries(['print-data', printerId]);
    },
    onError: () => {
      toast.error('Neuspješno skeniranje akreditacije!');
    },
  });
};
