import {
  getCreateNotificationDto,
  getNotificationDto,
  getUpdateNotificationDto,
} from '@ddays-app/types';

export const _CreateNotificationDto = getCreateNotificationDto();
export class CreateNotificationDto extends _CreateNotificationDto {}

export const _UpdateNotificationDto = getUpdateNotificationDto();
export class UpdateNotificationDto extends _UpdateNotificationDto {}

export const _NotificationDto = getNotificationDto();
export class NotificationDto extends _NotificationDto {}
