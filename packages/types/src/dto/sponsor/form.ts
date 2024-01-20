import { FormSteps, StepStatus } from '@src/model';
import { IsNumber, IsString } from 'class-validator';

export const getSponsorFormStatusDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class SponsorFormStatusDto {
    status: { [key in FormSteps]: StepStatus };
  }

  return SponsorFormStatusDto;
};

export const getSponsorDescriptionDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class SponsorDescriptionDto {
    @IsString()
    description: string;
  }
  return SponsorDescriptionDto;
};

export const getSponsorJobDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};
  class SponsorJobDto {
    @IsNumber()
    id: number;

    @IsString()
    position: string;

    @IsString()
    location: string;

    @IsString()
    details: string;
  }

  return SponsorJobDto;
};
