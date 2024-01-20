import {
  getCreateInterestDto,
  getInterestDto,
  getUpdateCompanyInterestsDto,
  getUpdateInterestDto,
} from '@ddays-app/types';

export const _CreateInterestDto = getCreateInterestDto();
export class CreateInterestDto extends _CreateInterestDto {}

export const _GetInterestDto = getInterestDto();
export class InterestDto extends _GetInterestDto {}

export const _UpdateInterestDto = getUpdateInterestDto();
export class UpdateInterestDto extends _UpdateInterestDto {}

export const _UpdateCompanyInterestsDto = getUpdateCompanyInterestsDto();
export class UpdateCompanyInterestsDto extends _UpdateCompanyInterestsDto {}
