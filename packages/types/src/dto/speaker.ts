import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CompanyPublicDto } from './company';

export type SpeakerDto = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  companyId?: number;
  photoUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  description?: string;
};

export class SpeakerModifyDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  companyId?: number;

  @IsOptional()
  @IsString()
  instagramUrl?: string;

  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export type SpeakerWithCompanyDto = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  companyId?: number;
  photoUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  description?: string;
  company?: CompanyPublicDto;
};
