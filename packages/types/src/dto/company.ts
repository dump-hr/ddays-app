import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { CompanyCategory } from '../enum';
import { InterestDto } from './interest';
import { IsBetweenWordCount } from 'src/validators/is-between-word-count';

export type CompanyPublicDto = {
  id: number;
  category: `${CompanyCategory}`;
  name: string;

  description?: string;
  opportunitiesDescription?: string;
  website?: string;
  boothLocation?: string;
  logoImage?: string;
  landingImage?: string;
  video?: string;
  interests?: InterestDto[];
};

export type CompanyDto = {
  id: number;
  category: `${CompanyCategory}`;
  name: string;
  username: string;
  password: string;
  description?: string;
  opportunitiesDescription?: string;
  website?: string;
  boothLocation?: string;
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
  description: string;

  @IsOptional()
  @IsString()
  @IsBetweenWordCount(70, 5)
  opportunitiesDescription: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  website: string;

  @IsOptional()
  @IsString()
  boothLocation: string;

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

  @IsString()
  @IsBetweenWordCount(70, 5)
  opportunitiesDescription: string;

  @IsString()
  @IsUrl()
  website: string;
}
