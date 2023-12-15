import { getCreateInterestDto } from './create';
import { PartialType } from '@nestjs/mapped-types';

export const getUpdateInterestDto = (ApiPropertySwagger?: any) => {
  const CreateInterestDto = getCreateInterestDto(ApiPropertySwagger);

  class UpdateInterestDto extends PartialType(CreateInterestDto) {}

  return UpdateInterestDto;
};
