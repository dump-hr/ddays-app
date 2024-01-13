import { FormSteps, StepStatus } from '@src/model';
import { IsNumber, IsString } from 'class-validator';

export const getSponsorFormStatusDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class SponsorFormStatusDto {
    @ApiProperty()
    status: { [key in FormSteps]: StepStatus };
  }

  return SponsorFormStatusDto;
};

export const getSponsorDescriptionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class SponsorDescriptionDto {
    @IsString()
    @ApiProperty()
    description: string;
  }
  return SponsorDescriptionDto;
};

export const getSponsorJobDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class SponsorJobDto {
    @IsNumber()
    @ApiProperty()
    id: number;

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

  return SponsorJobDto;
};
