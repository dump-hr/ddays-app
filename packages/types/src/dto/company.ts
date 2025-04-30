import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { CompanyCategory } from '../enum';
import { InterestDto } from './interest';
import { IsBetweenWordCount } from '../validators/is-between-word-count';
import { JobDto } from './job';

export type CompanyPublicDto = {
  id: number;
  category: `${CompanyCategory}`;
  name: string;
  description?: string;
  opportunitiesDescription?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  booth?: string;
  logoImage?: string;
  landingImage?: string;
  landingImageCompanyCulture?: string;
  bookOfStandards?: string;
  video?: string;
  interests?: InterestDto[];
  jobs?: JobDto[];
  averageRating?: number;
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

export class CompanyModifyDto {
  @IsEnum(CompanyCategory)
  category: CompanyCategory;

  @IsString() // TODO: add is not empty
  name: string;

  @IsString() // TODO: add is not empty
  username: string;

  @IsOptional()
  @IsString()
  @IsBetweenWordCount(70, 5)
  @ValidateIf((e) => e.description !== '')
  description: string;

  @IsOptional()
  @IsString()
  @IsBetweenWordCount(70, 5)
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
  codeId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  interestIds: number[];
}

export class CompanyModifyDescriptionDto {
  @IsString()
  @IsBetweenWordCount(70, 5)
  description: string;

  @IsOptional()
  @IsString()
  @IsBetweenWordCount(70, 5)
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
