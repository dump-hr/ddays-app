import { FloorPlanCompanyDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const getFloorPlanCompanies = () => {
  return axios.get<never, FloorPlanCompanyDto[]>('/company/floor-plan');
};

export const useGetFloorPlanCompanies = (
  options?: QueryOptions<FloorPlanCompanyDto[]>,
) => {
  return useQuery(['floorPlan'], () => getFloorPlanCompanies(), options);
};
