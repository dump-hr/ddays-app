import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationStatus } from 'src/enum';

export type NotificationDto = {
  id: number;
  title: string;
  content: string;
  activatedAt?: Date;
  expiresAt?: Date;
  createdAt?: Date;
  createdByUserId?: number;
  eventId?: number;
  isActive?: boolean;
};

export class NotificationResponseDto {
  userId: number;
  notificationId: number;
  deliveredAt?: Date;
  readAt?: Date;
  notification: NotificationDto;
  status: NotificationStatus;
}

export class NotificationModifyDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

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
