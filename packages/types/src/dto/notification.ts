import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationType } from 'src/enum';

export type NotificationDto = {
  id: number;
  title: string;
  content?: string;
  type: NotificationType;
  activatedAt?: Date;
  expiresAt?: Date;
  createdAt?: Date;
  createdByUserId?: number;
  eventId?: number;
  isActive?: boolean;
};

export class NotificationModifyDto {
  @IsString()
  title: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDate()
  activatedAt?: Date;

  @IsOptional()
  @IsDate()
  expiresAt?: Date;

  @IsOptional()
  @IsNumber()
  createdByUserId?: number;

  @IsOptional()
  @IsNumber()
  eventId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
