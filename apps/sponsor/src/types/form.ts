import { FormSteps, getSponsorFormStatusDto } from '@ddays-app/types';
import React from 'react';

export const _SponsorFormStatusDto = getSponsorFormStatusDto();
export class SponsorFormStatusDto extends _SponsorFormStatusDto {}

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
