import { CompanyCategory } from '@ddays-app/types';
import React from 'react';

export enum FormSteps {
  Description = 'Description',
  Logo = 'Logo',
  Photos = 'Photos',
  Videos = 'Videos',
  Jobs = 'Jobs',
  Interests = 'Interests',
  // SwagBag = 'SwagBag',
}

export enum StepStatus {
  Pending = 'Pending',
  Good = 'Good',
  Bad = 'Bad',
}

export type FormComponent = React.FC<{
  close: () => void;
  initialSrc?: string;
}>;

export type FormStep = {
  title: string;
  description: string | ((category: CompanyCategory) => string);
  component: FormComponent;
  tier?: CompanyCategory[];
};

export type SponsorForm = {
  [key in keyof typeof FormSteps]: FormStep;
};
