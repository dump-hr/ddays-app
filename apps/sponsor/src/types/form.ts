import React from 'react';

export enum FormStatus {
  Pending = 'Pending',
  Good = 'Good',
  Bad = 'Bad',
}

export type FormComponent = React.FC<{
  close: () => void;
}>;

export type Form = {
  title: string;
  description: string;
  component: FormComponent;
};
