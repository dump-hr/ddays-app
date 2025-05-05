import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { AchievementDto } from './achievement';

export type CodeDto = {
  id: number;
  value: string;
  description?: string;
  points?: number;
  isActive?: boolean;
  isSingleUse?: boolean;
  hasPage?: boolean;
  expirationDate?: Date;
  createdAt?: Date;
};

export type CodeWithConnectedAchievementsDto = CodeDto & {
  connectedAchievements?: AchievementDto[];
};

export class CodeModifyDto {
  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isSingleUse?: boolean;

  @IsOptional()
  @IsBoolean()
  hasPage?: boolean;

  @IsOptional()
  expirationDate?: Date;
}
