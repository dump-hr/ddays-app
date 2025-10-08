import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SponsorStatus, Tier } from 'src/enum';

export type PotentialSponsorDto = {
  id: number;
  tier: `${Tier}`;
  company: string;
  email?: string;
  representative: string;
  comment?: string;
  status: `${SponsorStatus}`;
  notes?: string;
};

export class PotentialSponsorModifyDto {
  @IsEnum(Tier)
  tier: `${Tier}`;

  @IsString()
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

  @IsString()
  @IsOptional()
  notes: string;
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
