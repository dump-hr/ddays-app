import { IsEnum, IsNumber, IsString } from 'class-validator';
import { SponsorCategory } from 'src/model';

export const getUpdateCompanyDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class UpdateCompanyDto {
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
  }
  return UpdateCompanyDto;
};
