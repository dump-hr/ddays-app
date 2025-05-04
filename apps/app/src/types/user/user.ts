import { UserDto } from '@ddays-app/types/src/dto/user';

export type ProfileSettingsDto = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
};

export type PasswordInputs = {
  password?: string;
  newPassword?: string;
  repeatedPassword?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type FlyTalksRegistrationDto = {
  linkedIn: string;
  github: string;
  portfolio: string;
  about: string;
  file: File | null;
};

export type UserPublicDto = UserDto & {
  id: number;
  points: number | null;
  isDeleted: boolean;
  isConfirmed: boolean;
};
