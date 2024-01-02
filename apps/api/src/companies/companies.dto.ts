import {
  getAddSponsorDescriptionDto,
  getAddSponsorLandingImageDto,
  getAddSponsorLogoDto,
  getAddSponsorVideoDto,
  getCreateCompanyDto,
  getUpdateCompanyDto,
} from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateCompanyDto = getCreateCompanyDto(ApiProperty);
export class CreateCompanyDto extends _CreateCompanyDto {}

export const _UpdateCompanyDto = getUpdateCompanyDto(ApiProperty);
export class UpdateCompanyDto extends _UpdateCompanyDto {}

export const _addSponsorDescriptionDto =
  getAddSponsorDescriptionDto(ApiProperty);
export class AddSponsorDescriptionDto extends _addSponsorDescriptionDto {}

export const _addSponsorLogoDto = getAddSponsorLogoDto(ApiProperty);
export class AddSponsorLogoDto extends _addSponsorLogoDto {}

export const _addSponsorVideoDto = getAddSponsorVideoDto(ApiProperty);
export class AddSponsorVideoDto extends _addSponsorVideoDto {}

export const _addSponsorLandingImageDto =
  getAddSponsorLandingImageDto(ApiProperty);
export class AddSponsorLandingImageDto extends _addSponsorLandingImageDto {}
