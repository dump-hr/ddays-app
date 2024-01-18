import {
  IsArray,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { SponsorCategory } from 'src/model';

export const getCreateCompanyDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class CreateCompanyDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(SponsorCategory)
    sponsorCategory?: string;

    @IsOptional()
    @IsString()
    websiteUrl?: string;

    @IsOptional()
    @IsString()
    boothLocation?: string;

    @IsArray()
    @IsNumber({}, { each: true })
    interests: number[];
  }
  return CreateCompanyDto;
};
