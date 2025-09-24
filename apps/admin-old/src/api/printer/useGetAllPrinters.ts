import { PrinterDto } from '@ddays-app/types/src/dto/printer';
import { useQuery } from 'react-query';

import { api } from '..';

export const getAllPrinters = () => {
  return api.get<never, PrinterDto[]>('/printers/all');
};

export const useGetAllPrinters = () => {
  return useQuery(['printers'], getAllPrinters);
};
