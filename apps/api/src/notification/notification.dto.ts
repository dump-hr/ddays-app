import {
  getCreateNotificationDto,
  getUpdateNotificationDto,
} from '@ddays-app/types';
import { ApiProperty } from '@nestjs/swagger';

export const _CreateNotificationDto = getCreateNotificationDto(ApiProperty);
export class CreateNotificationDto extends _CreateNotificationDto {}

export const _UpdateNotificationDto = getUpdateNotificationDto(ApiProperty);
export class UpdateNotificationDto extends _UpdateNotificationDto {}

export const _NotificationDto = getUpdateNotificationDto(ApiProperty);
export class NotificationDto extends _NotificationDto {}
