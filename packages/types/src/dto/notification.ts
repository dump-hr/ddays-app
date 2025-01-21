import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
