import { InterestDto, JwtPayload } from '@ddays-app/types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

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

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  profilePhotoUrl: string;

  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @Transform(({ value }) => {
    if (value === '') return null;
    return typeof value === 'string' ? Number(value) : value;
  })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  birthYear: number;

  @IsString()
  @MaxLength(100)
  educationDegree: string;

  @IsString()
  @MaxLength(100)
  occupation: string;

  @IsBoolean()
  newsletterEnabled: boolean;

  @IsBoolean()
  companiesNewsEnabled: boolean;

  @IsArray()
  interests: InterestDto[];
}
