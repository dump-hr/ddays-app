import { Theme, Tier } from '@ddays-app/types';

export const interestLabels = {
  [Theme.DEV]: 'Development',
  [Theme.DESIGN]: 'Design',
  [Theme.TECH]: 'Tech',
  [Theme.MARKETING]: 'Marketing',
};

export const TierLabels: Record<Tier, string> = {
  [Tier.DEFAULT]: '-',
  [Tier.BRONZE]: 'Brončani',
  [Tier.SILVER]: 'Srebrni',
  [Tier.GOLD]: 'Zlatni',
};
