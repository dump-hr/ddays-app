import { UserPublicDto } from '@ddays-app/types/src/dto/user';
import { useQuery } from 'react-query';

import { api } from '..';

interface PrinterResponseDto {
  id: number;
  userId: number;
  printerId: number;
  user: UserPublicDto;
}

const getPrintData = (printerId: number) => {
  return api.get<never, PrinterResponseDto>(
    `/printers/${printerId}/print-data`,
  );
};

export const useGetPrintData = (printerId: number) => {
  return useQuery(['print-data', printerId], () => getPrintData(printerId), {
    enabled: !!printerId,
  });
};
