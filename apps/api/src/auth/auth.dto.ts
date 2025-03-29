import { JwtPayload } from '@ddays-app/types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}