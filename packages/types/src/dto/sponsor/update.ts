import { IsNumber, IsString } from 'class-validator';

export const getUpdateSponsorDescriptionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddDescriptionDto {
    @IsString()
    @ApiProperty()
    description: string;
  }
  return AddDescriptionDto;
};

export const getAddSponsorJobDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class AddSponsorJobDto {
    @IsNumber()
    @ApiProperty()
    companyId: number;

    @IsString()
    @ApiProperty()
    position: string;

    @IsString()
    @ApiProperty()
    location: string;

    @IsString()
    @ApiProperty()
    details: string;
  }

  return AddSponsorJobDto;
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
