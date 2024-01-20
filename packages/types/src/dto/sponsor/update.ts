import { IsNumber, IsString } from 'class-validator';

export const getUpdateSponsorDescriptionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddDescriptionDto {
    @IsString()
    description: string;
  }
  return AddDescriptionDto;
};

export const getAddSponsorJobDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorJobDto {
    @IsNumber()
    companyId: number;

    @IsString()
    position: string;

    @IsString()
    location: string;

    @IsString()
    details: string;
  }

  return AddSponsorJobDto;
};

export const getAddSponsorLogoDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorImageDto {
    @IsString()
    imageUrl: string;
  }
  return AddSponsorImageDto;
};

export const getAddSponsorVideoDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorVideoDto {
    @IsString()
    videoUrl: string;
  }
  return AddSponsorVideoDto;
};

export const getAddSponsorLandingImageDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorLandingImageDto {
    @IsString()
    imageUrl: string;
  }
  return AddSponsorLandingImageDto;
};
