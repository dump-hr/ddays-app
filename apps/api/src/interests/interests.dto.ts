import {
  getCreateInterestDto,
  getInterestDto,
  getUpdateCompanyInterestsDto,
  getUpdateInterestDto,
} from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateInterestDto = getCreateInterestDto(ApiProperty);
export class CreateInterestDto extends _CreateInterestDto {}

export const _GetInterestDto = getInterestDto(ApiProperty);
export class InterestDto extends _GetInterestDto {}

export const _UpdateInterestDto = getUpdateInterestDto(ApiProperty);
export class UpdateInterestDto extends _UpdateInterestDto {}

export const _UpdateCompanyInterestsDto =
  getUpdateCompanyInterestsDto(ApiProperty);
export class UpdateCompanyInterestsDto extends _UpdateCompanyInterestsDto {}
