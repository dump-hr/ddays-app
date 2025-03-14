import { UserDto } from '@ddays-app/types/src/dto/user';

export type ExtendedUserDto = UserDto & {
  newPassword: string;
  repeatedPassword: string;
};
