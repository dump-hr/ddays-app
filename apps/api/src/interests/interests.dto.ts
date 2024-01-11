import {
  getCreateInterestDto,
  getUpdateCompanyInterestsDto,
  getUpdateInterestDto,
} from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateInterestDto = getCreateInterestDto(ApiProperty);
export class CreateInterestDto extends _CreateInterestDto {}

export const _UpdateInterestDto = getUpdateInterestDto(ApiProperty);
export class UpdateInterestDto extends _UpdateInterestDto {}

export const _UpdateCompanyInterestsDto =
  getUpdateCompanyInterestsDto(ApiProperty);
export class UpdateCompanyInterestsDto extends _UpdateCompanyInterestsDto {}
