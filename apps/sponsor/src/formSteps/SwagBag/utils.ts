import { CompanyCategory } from '@ddays-app/types';

export const getMaxJobsPerTier = (category: CompanyCategory) => {
  switch (category) {
    case CompanyCategory.BRONZE:
      return 2;
    case CompanyCategory.SILVER:
      return 2;
    case CompanyCategory.GOLD:
      return 3;
    default:
      return 0;
  }
};
