import {
  getAddSponsorJobDto,
  getAddSponsorLandingImageDto,
  getAddSponsorLogoDto,
  getAddSponsorVideoDto,
  getCompanyDto,
  getCreateCompanyDto,
  getSponsorDescriptionDto,
  getSponsorJobDto,
  getUpdateCompanyDto,
  getUpdateSponsorDescriptionDto,
} from '@ddays-app/types';

export const _CreateCompanyDto = getCreateCompanyDto();
export class CreateCompanyDto extends _CreateCompanyDto {}

export const _UpdateCompanyDto = getUpdateCompanyDto();
export class UpdateCompanyDto extends _UpdateCompanyDto {}

export const _GetCompanyDto = getCompanyDto();
export class CompanyDto extends _GetCompanyDto {}

export const _updateSponsorDescriptionDto = getUpdateSponsorDescriptionDto();
export class UpdateSponsorDescriptionDto extends _updateSponsorDescriptionDto {}

export const _getSponsorDescriptionDto = getSponsorDescriptionDto();
export class SponsorDescriptionDto extends getSponsorDescriptionDto() {}

export const _getSponsorJobDto = getSponsorJobDto();
export class SponsorJobsDto extends _getSponsorJobDto {}

export const _addSponsorJobDto = getAddSponsorJobDto();
export class AddSponsorJobDto extends _addSponsorJobDto {}

export const _addSponsorLogoDto = getAddSponsorLogoDto();
export class AddSponsorLogoDto extends _addSponsorLogoDto {}

export const _addSponsorVideoDto = getAddSponsorVideoDto();
export class AddSponsorVideoDto extends _addSponsorVideoDto {}

export const _addSponsorLandingImageDto = getAddSponsorLandingImageDto();
export class AddSponsorLandingImageDto extends _addSponsorLandingImageDto {}
