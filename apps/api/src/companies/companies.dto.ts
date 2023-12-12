import { getCreateCompanyDto, getUpdateCompanyDto } from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateCompanyDto = getCreateCompanyDto(ApiProperty);
export class CreateCompanyDto extends _CreateCompanyDto {}

export const _UpdateCompanyDto = getUpdateCompanyDto(ApiProperty);
export class UpdateCompanyDto extends _UpdateCompanyDto {}
