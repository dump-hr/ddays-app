import { IsEmail, IsNumber, IsString, IsUrl } from 'class-validator';

type SponsorTyoe =
  | 'general'
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'workshop'
  | 'foodAndBeverage'
  | 'generalMedia'
  | 'media'
  | 'organizational'
  | 'prizeGame'
  | 'friend';

export const getCompanyDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class CompanyDto {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsUrl()
    @ApiProperty()
    url: string;

    @IsString()
    @ApiProperty()
    sponsorCategory: SponsorTyoe;

    @IsString()
    @ApiProperty()
    boothLocation: string;‚

    @IsEmail()
    @ApiProperty()
    email: string;
  }

  return CompanyDto;
};
