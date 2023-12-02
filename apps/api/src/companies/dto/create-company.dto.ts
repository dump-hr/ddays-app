import { IsEnum, IsNumber, IsString } from 'class-validator';
import { sponsorCategory } from 'db/schema';

export type sponsorCategory =
  | 'general'
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'workshop'
  | 'foodAndBeverage'
  | 'generalMedia'
  | 'media'
  | 'organizational'
  | 'prizeGame'
  | 'friend';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(sponsorCategory.enumValues)
  sponsorCategory: string;

  @IsString()
  websiteUrl: string;

  @IsString()
  boothLocation: string;

  @IsNumber()
  codeId: number;
}
