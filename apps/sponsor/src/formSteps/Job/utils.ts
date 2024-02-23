import { CompanyCategory } from '@ddays-app/types';

export const getMaxJobsPerTier = (category: CompanyCategory) => {
  switch (category) {
    case CompanyCategory.Bronze:
      return 2;
    case CompanyCategory.Silver:
      return 3;
    case CompanyCategory.Gold:
      return 3;
    default:
      return 0;
  }
};
