import { UserDto } from '@ddays-app/types/src/dto/user';

export type RegistrationDto = UserDto & {
  repeatedPassword: string;
  newPassword: string;
};
