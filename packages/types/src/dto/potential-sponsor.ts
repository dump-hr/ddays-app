import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { SponsorStatus, Tier } from 'src/enum';

export type PotentialSponsorDto = {
  id: number;
  tier: `${Tier}`;
  company: string;
  email?: string;
  representative: string;
  comment?: string;
  status: `${SponsorStatus}`;
};

export class PotentialSponsorModifyDto {
  @IsEnum(Tier)
  tier: `${Tier}`;

  @IsString()
  @Length(1)
  company: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  representative: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsEnum(SponsorStatus)
  status: `${SponsorStatus}`;
}

export type SponsorMaterialsDto = {
  id: number;
  sponsorId: number;
  logo: boolean;
  picture: boolean;
  description: boolean;
  video: boolean;
  advertisement: boolean;
  appCareer: boolean;
  campfire: boolean;
  flyTalks: boolean;
  swagBag: boolean;
  boothPlan: boolean;
  equipment: boolean;
  peopleForAccreditation: boolean;
  insertedIntoApp: boolean;
  notes?: string;
  sponsor?: PotentialSponsorDto;
};

export class SponsorMaterialsModifyDto {
  @IsOptional()
  @IsBoolean()
  logo: boolean;

  @IsOptional()
  @IsBoolean()
  picture: boolean;

  @IsOptional()
  @IsBoolean()
  description: boolean;

  @IsOptional()
  @IsBoolean()
  video: boolean;

  @IsOptional()
  @IsBoolean()
  advertisement: boolean;

  @IsOptional()
  @IsBoolean()
  appCareer: boolean;

  @IsOptional()
  @IsBoolean()
  campfire: boolean;

  @IsOptional()
  @IsBoolean()
  flyTalks: boolean;

  @IsOptional()
  @IsBoolean()
  swagBag: boolean;

  @IsOptional()
  @IsBoolean()
  boothPlan: boolean;

  @IsOptional()
  @IsBoolean()
  equipment: boolean;

  @IsOptional()
  @IsBoolean()
  peopleForAccreditation: boolean;

  @IsOptional()
  @IsBoolean()
  insertedIntoApp: boolean;

  @IsString()
  @IsOptional()
  notes: string;
}
