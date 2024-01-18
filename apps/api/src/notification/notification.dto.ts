import {
  getCreateNotificationDto,
  getUpdateNotificationDto,
} from '@ddays-app/types';

export const _CreateNotificationDto = getCreateNotificationDto();
export class CreateNotificationDto extends _CreateNotificationDto {}

export const _UpdateNotificationDto = getUpdateNotificationDto();
export class UpdateNotificationDto extends _UpdateNotificationDto {}

export const _NotificationDto = getUpdateNotificationDto();
export class NotificationDto extends _NotificationDto {}
