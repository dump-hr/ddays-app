import { EventTheme } from '@src/model';
import { IsEnum, IsString } from 'class-validator';

export const getUpdateInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateInterestDto {
    @IsString()
    name?: string;

    @IsEnum(EventTheme)
    theme?: EventTheme;
  }

  return UpdateInterestDto;
};
