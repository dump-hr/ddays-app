import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsStrongPassword,
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

    @IsNumber()
    @ApiProperty()
    codeId?: number;

    @IsEmail()
    @ApiProperty()
    email?: string;

    @IsNumber(
      {
        allowNaN: false,
        maxDecimalPlaces: 0,
      },
      {
        each: true,
      },
    )
    @ApiProperty()
    interests?: number[];
  }

  return UpdateCompanyDto;
};
