import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export type AchievementDto = {
  id: number;
  name: string;
  description: string;
  points: number;
  fulfillmentCodeCount: number;
  isHidden: boolean;
  createdAt: Date;
};

export class AchievementModifyDto {
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
