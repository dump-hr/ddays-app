import { UserDto } from '@ddays-app/types/src/dto/user';

export type RegistrationDto = UserDto & {
  newPassword: string;
  repeatedPassword: string;
};
