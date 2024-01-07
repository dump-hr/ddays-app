import { getSponsorFormStatusDto } from '@ddays-app/types';
import React from 'react';

export const _SponsorFormStatusDto = getSponsorFormStatusDto();
export class SponsorFormStatusDto extends _SponsorFormStatusDto {}

export enum FormSteps {
  Description = 'Description',
  Logo = 'Logo',
  Photos = 'Photos',
  Videos = 'Videos',
  Jobs = 'Jobs',
  Interests = 'Interests',
  SwagBag = 'SwagBag',
}

export enum StepStatus {
  Pending = 'Pending',
  Good = 'Good',
  Bad = 'Bad',
}

export type FormComponent = React.FC<{
  close: () => void;
}>;

export type FormStep = {
  title: string;
  description: string;
  component: FormComponent;
};

export type SponsorForm = {
  [key in keyof typeof FormSteps]: FormStep;
};
