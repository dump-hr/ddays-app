import { getCreateCompanyDto } from './create';
import { PartialType } from '@nestjs/mapped-types';

export const getUpdateCompanyDto = (ApiPropertySwagger?: any) => {
  const CreateCompanyDto = getCreateCompanyDto(ApiPropertySwagger);

  class UpdateCompanyDto extends PartialType(CreateCompanyDto) {} //TODO: Possibly exclude password and email here, maybe make a specific enpoint for that

  return UpdateCompanyDto;
};
