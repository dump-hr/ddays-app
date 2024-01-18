import { EventTheme } from '@src/model';
import { IsArray, IsEnum, IsString } from 'class-validator';

export const getCreateInterestDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateInterestDto {
    @IsString()
    name: string;

    @IsEnum(EventTheme)
    theme: EventTheme;
  }

  return CreateInterestDto;
};

export const getUpdateCompanyInterestsDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateCompanyInterestsDto {
    @IsArray()
    ids: number[];
  }

  return UpdateCompanyInterestsDto;
};
