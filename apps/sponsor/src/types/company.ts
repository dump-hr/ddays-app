import {
  getAddSponsorJobDto,
  getCompanyDto,
  getSponsorDescriptionDto,
  getSponsorJobDto,
  getUpdateCompanyDto,
  getUpdateSponsorDescriptionDto,
} from '@ddays-app/types';

export class AddSponsorJobDto extends getAddSponsorJobDto() {}
export class SponsorDescriptionDto extends getSponsorDescriptionDto() {}
export class SponsorJobDto extends getSponsorJobDto() {}
export class CompanyDto extends getCompanyDto() {}
export class UpdateSponsorDescriptionDto extends getUpdateSponsorDescriptionDto() {}
export class UpdateCompanyDto extends getUpdateCompanyDto() {}
