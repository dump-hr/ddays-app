import {
  IsEmail,
  IsEnum,
  IsNumber,
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
    description: string;

    @IsEnum(SponsorCategory)
    @ApiProperty()
    sponsorCategory: string;

    @IsString()
    @ApiProperty()
    websiteUrl: string;

    @IsString()
    @ApiProperty()
    boothLocation: string;

    @IsNumber()
    @ApiProperty()
    codeId: number;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    // @IsStrongPassword()
    @ApiProperty()
    password: string;
  }
  return CreateCompanyDto;
};
