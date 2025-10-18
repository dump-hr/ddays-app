import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  ValidateIf,
} from 'class-validator';
import { CompanyCategory } from '../enum';
import { InterestDto } from './interest';
import { IsBetweenWordCount } from '../validators/is-between-word-count';
import { JobDto } from './job';

export type CompanyPublicDto = {
  id: number;
  category?: `${CompanyCategory}`;
  name: string;
  username: string;
  description?: string;
  opportunitiesDescription?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  logoImage?: string;
  landingImage?: string;
  landingImageCompanyCulture?: string;
  bookOfStandards?: string;
  video?: string;
  peopleForAccreditation?: string[];
  swagBag?: string;
  swagBagNumber?: number;
  boothPlan?: string;
  equipment?: string;
  notes?: string[];
  campfireParticipation: boolean;
  campfireSpeakers?: string[];
  codeId?: number;
  booth?: string;
  boothId?: number;
  interests?: InterestDto[];
  jobs?: JobDto[];
  averageRating?: number;
  flytalkParticipation?: boolean;
  flytalkHolders?: JSON;
};

export type CompanyDto = {
  id: number;
  category: `${CompanyCategory}`;
  name: string;
  username: string;
  password: string;
  description?: string;
  opportunitiesDescription?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  boothId?: number;
  logoImage?: string;
  landingImage?: string;
  video?: string;
  codeId?: number;
  interests?: InterestDto[];
};

export type CompanyWithFlyTalkDto = {
  id: number;
  name: string;
  logoImage?: string;
};

export class CompanyModifyDto {
  @IsEnum(CompanyCategory)
  category: CompanyCategory;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  @IsBetweenWordCount(40, 30)
  @ValidateIf((e) => e.description !== '')
  description: string;

  @IsOptional()
  @IsString()
  @IsBetweenWordCount(40, 30)
  opportunitiesDescription: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ValidateIf((e) => e.websiteUrl !== '')
  websiteUrl: string;

  @IsOptional()
  @IsString()
  instagramUrl: string;

  @IsOptional()
  @IsString()
  linkedinUrl: string;

  @IsOptional()
  @IsNumber()
  codeId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  interestIds: number[];
}

export class CompanyModifyFlyTalkHoldersDto {
  @IsBoolean()
  flytalkParticipation: boolean;

  @IsJSON()
  @IsOptional()
  flytalkHolders: JSON;
}

export class CompanyModifyDescriptionDto {
  @IsString()
  @IsBetweenWordCount(40, 30)
  description: string;

  @IsOptional()
  @IsString()
  @IsBetweenWordCount(40, 30)
  @ValidateIf((e) => e.opportunitiesDescription !== '')
  opportunitiesDescription: string;

  @IsString()
  @IsUrl()
  websiteUrl: string;

  @IsOptional()
  @ValidateIf((e) => e.instagramUrl !== '')
  @IsString()
  @IsUrl()
  instagramUrl: string;

  @IsOptional()
  @ValidateIf((e) => e.linkedinUrl !== '')
  @IsString()
  @IsUrl()
  linkedinUrl: string;
}

export type FloorPlanCompanyDto = {
  name: string;
  booth: string;
  logoImage?: string;
  boothId?: number;
  interests?: InterestDto[];
  boothRating: number;
};
