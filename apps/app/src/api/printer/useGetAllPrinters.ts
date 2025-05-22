import { PrinterDto } from '@ddays-app/types/src/dto/printer';
import { useQuery } from 'react-query';

import axios from '../base';

export const getAllPrinters = () => {
  return axios.get<never, PrinterDto[]>('/printers/all');
};

export const useGetAllPrinters = () => {
  return useQuery(['printers'], getAllPrinters);
};
