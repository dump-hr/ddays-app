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

    @IsOptional()
    @IsString()
    @ApiProperty()
    description?: string;

    @IsOptional()
    @IsEnum(SponsorCategory)
    @ApiProperty()
    sponsorCategory?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    websiteUrl?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    boothLocation?: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @ApiProperty()
    interests: number[];
  }
  return CreateCompanyDto;
};
