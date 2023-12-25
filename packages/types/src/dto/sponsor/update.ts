import { IsString } from 'class-validator';

export const getAddSponsorDescriptionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddDescriptionDto {
    @IsString()
    @ApiProperty()
    description: string;
  }
  return AddDescriptionDto;
};

export const getAddSponsorLogoDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorImageDto {
    @IsString()
    @ApiProperty()
    imageUrl: string;
  }
  return AddSponsorImageDto;
};

export const getAddSponsorVideoDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorVideoDto {
    @IsString()
    @ApiProperty()
    videoUrl: string;
  }
  return AddSponsorVideoDto;
};

export const getAddSponsorLandingImageDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorLandingImageDto {
    @IsString()
    @ApiProperty()
    imageUrl: string;
  }
  return AddSponsorLandingImageDto;
};
