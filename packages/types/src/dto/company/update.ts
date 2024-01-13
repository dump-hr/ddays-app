import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsString,
} from 'class-validator';
import { SponsorCategory } from 'src/model';

export const getUpdateCompanyDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class UpdateCompanyDto {
    @IsString()
    @ApiProperty()
    name?: string;

    @IsString()
    @ApiProperty()
    description?: string;

    @IsEnum(SponsorCategory)
    @ApiProperty()
    sponsorCategory?: string;

    @IsString()
    @ApiProperty()
    websiteUrl?: string;

    @IsString()
    @ApiProperty()
    boothLocation?: string;

    @IsEmail()
    @ApiProperty()
    email?: string;

    @IsArray()
    @IsNumberString({}, { each: true })
    @ApiProperty()
    interests: string[];
  }

  return UpdateCompanyDto;
};
