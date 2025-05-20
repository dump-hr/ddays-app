import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UserModifyDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '') return null;
    return typeof value === 'string' ? Number(value) : value;
  })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  birthYear: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  educationDegree: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  occupation: string | null;

  @IsOptional()
  @IsBoolean()
  newsletterEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  companiesNewsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  isConfirmed?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
