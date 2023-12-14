import { IsEnum, IsNumber, IsString, isNumber } from 'class-validator';

//sponsor ids are temporary, in the future the sponsor id will be fetched from the jwt token or other auth

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
