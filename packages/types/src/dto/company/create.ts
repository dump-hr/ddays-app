import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { SponsorCategory } from 'src/model';

export const getCreateCompanyDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class CreateCompanyDto {
    @IsString()
    @ApiProperty()
    name: string;

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
    email: string;

    @IsArray()
    @IsNumberString({}, { each: true })
    @ApiProperty()
    interests: string[];
  }
  return CreateCompanyDto;
};
