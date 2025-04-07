import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export type UserDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled: boolean;
};

export class UserModifyDto {
  /*@IsString()*/
  firstName: string;

  /*@IsString()*/
  lastName: string;

  /*@IsEmail()*/
  email: string;
  /* 
  @IsString()*/
  password: string;
  /* 
  @IsString()*/
  phoneNumber: string;

  /*@IsNumber()*/
  birthYear: number;

  /*@IsString()
  @IsOptional()*/
  educationDegree?: string;

  /*@IsString()
  @IsOptional()*/
  occupation?: string;

  /*@IsNumber()
  @IsOptional()*/
  newsletterEnabled?: boolean;

  /*@IsBoolean()
  @IsOptional()*/
  companiesNewsEnabled?: boolean;

  /*@IsBoolean()
  @IsOptional()*/
  isConfirmed?: boolean;
}
