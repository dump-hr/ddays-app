import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export type AchievementGetAllResDto = {
  id: number;
  name: string;
  description: string;
  points: number;
  fulfillmentCodeCount: number;
  isHidden: boolean;
  createdAt: Date;
}[];

export class AchievementCreateReqDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  points: number;

  @IsOptional()
  @IsNumber()
  fulfillmentCodeCount: number;

  @IsOptional()
  @IsBoolean()
  isHidden: boolean;
}

export type AchievementCreateResDto = {
  id: number;
  name: string;
  description: string;
  points: number;
  fulfillmentCodeCount: number;
  isHidden: boolean;
  createdAt: Date;
};
