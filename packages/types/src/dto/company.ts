import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CompanyCategory } from '../enum';
import { InterestDto } from './interest';

export type CompanyPublicDto = {
  id: number;
  category: `${CompanyCategory}`;
  name: string;
  description?: string;
  websiteUrl?: string;
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
  websiteUrl?: string;
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

  @IsString()
  name: string;

  @IsString()
  username: string;

  // TODO: validate word count with custom decorator
  //
  // how to impelemnt:
  // https://github.com/typestack/class-validator#custom-validation-classes
  //
  // comapration logic:
  // function validateWordCount(str: string, limit: number, deviation: number) {
  //   const lowerBound = limit - deviation;
  //   const upperBound = limit + deviation;
  //
  //   const wc = str.match(/\S+/g)?.length || 0;
  //
  //   return wc >= lowerBound && wc <= upperBound;
  // }
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  websiteUrl: string;

  @IsOptional()
  @IsString()
  boothLocation: string;

  @IsOptional()
  @IsNumber()
  codeId: number;

  @IsOptional()
  @IsArray()
  @IsNumber(null, { each: true })
  interestIds: number[];
}

export class CompanyModifyDescriptionDto {
  @IsString()
  description: string;
}
