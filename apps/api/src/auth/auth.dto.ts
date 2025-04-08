import { JwtPayload } from '@ddays-app/types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export type UserJwtPayload = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user';
};

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
