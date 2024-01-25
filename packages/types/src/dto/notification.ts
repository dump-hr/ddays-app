import { IsOptional, IsString } from 'class-validator';

export type NotificationDto = {
  id: number;
  title: string;
  content?: string;
  activatedAt?: Date;
};

export class NotificationModifyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;
}
