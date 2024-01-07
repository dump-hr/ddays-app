import {
  getSponsorInterestDto,
  getUpdateCompanyInterestsDto,
} from '@ddays-app/types';

export const _SponsorInterestDto = getSponsorInterestDto();
export class SponsorInterestDto extends _SponsorInterestDto {}

export const _UpdateSponsorInterestsDto = getUpdateCompanyInterestsDto();
export class UpdateSponsorInterestsDto extends _UpdateSponsorInterestsDto {}
