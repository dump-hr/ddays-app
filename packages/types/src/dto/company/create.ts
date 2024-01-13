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
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    username: string;

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

    @IsArray()
    @IsNumber({}, { each: true })
    @ApiProperty()
    interests: number[];
  }
  return CreateCompanyDto;
};
