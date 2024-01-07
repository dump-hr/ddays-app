import { FormSteps, StepStatus } from '@src/model';

export const getSponsorFormStatusDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class SponsorFormStatusDto {
    @ApiProperty()
    status: { [key in FormSteps]: StepStatus };
  }

  return SponsorFormStatusDto;
};
