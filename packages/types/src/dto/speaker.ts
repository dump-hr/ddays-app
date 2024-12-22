import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CompanyPublicDto } from './company';

export type SpeakerPhoto = {
  mainPhotoUrl: string;
  thumbnailUrl: string;
};

export type SpeakerDto = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  companyId?: number;
  photo?: SpeakerPhoto;
  instagram?: string;
  linkedin?: string;
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
  instagram?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

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
  photo?: SpeakerPhoto;
  instagram?: string;
  linkedin?: string;
  description?: string;
  company?: CompanyPublicDto;
};
