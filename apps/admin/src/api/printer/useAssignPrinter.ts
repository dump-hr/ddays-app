import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { api } from '..';

const assignPrinter = ({
  printerId,
  userId,
}: {
  printerId: number;
  userId: number;
}) => {
  return api.post('/printers/assign', {
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
