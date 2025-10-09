import { SponsorStatus, Tier } from '@ddays-app/types';

export const TierLabels: Record<Tier, string> = {
  [Tier.DEFAULT]: '-',
  [Tier.BRONZE]: 'Brončani',
  [Tier.SILVER]: 'Srebrni',
  [Tier.GOLD]: 'Zlatni',
};

export const StatusLabels: Record<SponsorStatus, string> = {
  [SponsorStatus.DID_NOT_CONTACT]: 'Nismo kontaktirali',
  [SponsorStatus.DISCARDED]: 'Odbijeni',
  [SponsorStatus.ZERO_PING]: 'Nulti ping',
  [SponsorStatus.FIRST_PING]: 'Prvi ping',
  [SponsorStatus.SECOND_PING]: 'Drugi ping',
  [SponsorStatus.MEETING_DONE]: 'Sastanak obavljen',
  [SponsorStatus.INTERESTED]: 'Zainteresirani',
  [SponsorStatus.FOLLOW_UP]: 'Naknadno javljanje',
  [SponsorStatus.AGREED]: 'Dogovoreno',
};
