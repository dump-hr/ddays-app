import {
  IsArray,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { SponsorCategory } from 'src/model';

export const getUpdateCompanyDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateCompanyDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsEnum(SponsorCategory)
    sponsorCategory?: string;

    @IsString()
    websiteUrl?: string;

    @IsString()
    boothLocation?: string;

    @IsString()
    username: string;

    @IsArray()
    @IsNumber({}, { each: true })
    interests: number[];
  }

  return UpdateCompanyDto;
};
