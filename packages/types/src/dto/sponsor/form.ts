import { FormSteps, StepStatus } from '@src/model';
import { IsString } from 'class-validator';

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
