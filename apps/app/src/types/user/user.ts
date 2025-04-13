import { UserDto } from '@ddays-app/types/src/dto/user';

export type RegistrationDto = UserDto & {
  repeatedPassword: string;
  newPassword: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type UserPublicDto = UserDto & {
  id: number;
  points: number | null;
  isDeleted: boolean;
  isConfirmed: boolean;
};
