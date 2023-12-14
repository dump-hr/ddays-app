import { IsEnum, IsNumber, IsString, isNumber } from 'class-validator';

//sponsor ids are temporary, in the future the sponsor id will be fetched from the jwt token or other auth

export const getAddDescriptionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddDescriptionDto {
    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    sponsorId: number;
  }
  return AddDescriptionDto;
};

export const getAddSponsorLogoDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorImageDto {
    @IsString()
    @ApiProperty()
    imageUrl: string;

    @IsNumber()
    @ApiProperty()
    sponsorId: number;
  }
  return AddSponsorImageDto;
};

export const getAddSponsorVideoDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorVideoDto {
    @IsString()
    @ApiProperty()
    videoUrl: string;
    @IsNumber()
    @ApiProperty()
    sponsorId: number;
  }
  return AddSponsorVideoDto;
};

export const getAddSponsorLandingImageDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorLandingImageDto {
    @IsString()
    @ApiProperty()
    imageUrl: string;

    @IsNumber()
    @ApiProperty()
    sponsorId: number;
  }
  return AddSponsorLandingImageDto;
};
