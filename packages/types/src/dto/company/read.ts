import { IsNumber, IsString } from 'class-validator';

export const getCompanyDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class CompanyDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    websiteUrl: string;

    @IsString()
    @ApiProperty()
    boothLocation: string;

    @IsString()
    @ApiProperty()
    logoImage: string;

    @IsString()
    @ApiProperty()
    landingImage: string;

    @IsString()
    @ApiProperty()
    companyVideo: string;
  }

  return CompanyDto;
};
