import { UserDto } from '@ddays-app/types/src/dto/user';

export type RegistrationDto = UserDto & {
  repeatedPassword: string;
  newPassword: string;
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
}
