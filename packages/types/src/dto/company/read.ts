import { IsNumber, IsString, IsUrl } from 'class-validator';

type SponsorType =
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
    id: number;

    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    description: string;

    @IsUrl()
    url: string;

    @IsString()
    sponsorCategory: SponsorType;

    @IsString()
    websiteUrl: string;

    @IsString()
    boothLocation: string;

    @IsString()
    logoImage: string;

    @IsString()
    landingImage: string;

    @IsString()
    companyVideo: string;

    @IsString()
    codeId?: number;
  }

  return CompanyDto;
};
