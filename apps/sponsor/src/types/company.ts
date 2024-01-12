import {
  getSponsorDescriptionDto,
  getUpdateCompanyDto,
  getUpdateSponsorDescriptionDto,
} from '@ddays-app/types';

export class UpdateSponsorDescriptionDto extends getUpdateSponsorDescriptionDto() {}
export class UpdateCompanyDto extends getUpdateCompanyDto() {}
export class SponsorDescriptionDto extends getSponsorDescriptionDto() {}
