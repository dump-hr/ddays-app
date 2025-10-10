import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { MaterialsCheckboxState, SponsorStatus, Tier } from 'src/enum';

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
  logo: `${MaterialsCheckboxState}`;
  picture: `${MaterialsCheckboxState}`;
  description: `${MaterialsCheckboxState}`;
  video: `${MaterialsCheckboxState}`;
  advertisement: `${MaterialsCheckboxState}`;
  appCareer: `${MaterialsCheckboxState}`;
  campfire: `${MaterialsCheckboxState}`;
  flyTalks: `${MaterialsCheckboxState}`;
  swagBag: `${MaterialsCheckboxState}`;
  boothPlan: `${MaterialsCheckboxState}`;
  equipment: `${MaterialsCheckboxState}`;
  peopleForAccreditation: `${MaterialsCheckboxState}`;
  insertedIntoApp: `${MaterialsCheckboxState}`;
  potentialSponsor?: Partial<PotentialSponsorDto>;
};

export class SponsorMaterialsModifyDto {
  @IsInt()
  @IsNotEmpty()
  sponsorId: number;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  logo: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  picture: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  description: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  video: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  advertisement: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  appCareer: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  campfire: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  flyTalks: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  swagBag: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  boothPlan: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  equipment: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  peopleForAccreditation: `${MaterialsCheckboxState}`;

  @IsOptional()
  @IsEnum(MaterialsCheckboxState)
  insertedIntoApp: `${MaterialsCheckboxState}`;
}
