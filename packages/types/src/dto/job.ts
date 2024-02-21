import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export type JobDto = {
  id: number;
  position: string;
  location?: string;
  details: string;
  link?: string;
  createdAt: Date;
  companyId: number;
};

export class JobModifyDto {
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  details: string;

  @IsOptional()
  @IsUrl()
  @ValidateIf((e) => e.link !== '')
  link?: string;

  @IsNumber()
  companyId: number;
}

export class JobModifyForCompanyDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  details: string;

  @IsOptional()
  @IsUrl()
  @ValidateIf((e) => e.link !== '')
  link?: string;
}
