import {
  getCompanyDto,
  getCreateCompanyDto,
  getUpdateCompanyDto,
} from '@ddays-app/types';

export const _CreateCompanyDto = getCreateCompanyDto();
export class CreateCompanyDto extends _CreateCompanyDto {}

export const _UpdateCompanyDto = getUpdateCompanyDto();
export class UpdateCompanyDto extends _UpdateCompanyDto {}

export const _GetCompanyDto = getCompanyDto();
export class CompanyDto extends _GetCompanyDto {}