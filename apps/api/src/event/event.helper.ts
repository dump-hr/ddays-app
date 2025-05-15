import { EventType } from '@ddays-app/types';

export const getEventTypeText = (theme: EventType) => {
  switch (theme) {
    case EventType.LECTURE:
      return 'Vaše predavanje';
    case EventType.WORKSHOP:
      return 'Vaša radionica';
    case EventType.FLY_TALK:
      return 'Vaš fly talk';
    case EventType.CAMPFIRE_TALK:
      return 'Vaš campfire talk';
    case EventType.PANEL:
      return 'Vaš panel';
    default:
      return 'Vaš događaj';
  }
};

export const getTimesForNotification = (eventStartsAt: string) => {
  // Calculate notification timing
  const eventStartTime = new Date(eventStartsAt);
  const notificationTime = new Date(eventStartTime);
  notificationTime.setMinutes(eventStartTime.getMinutes() - 15); // 15 minutes before event starts

  // Current time to determine if notification should be active
  const now = new Date();
  const isActive = notificationTime <= now;
  // Calculate minutes until event for the notification message
  const minutesUntilEvent = isActive
    ? Math.max(
        1,
        Math.floor((eventStartTime.getTime() - now.getTime()) / (1000 * 60)),
      )
    : 15; // Default to 15 minutes if notification will be shown later

  return {
    now,
    eventStartTime,
    minutesUntilEvent,
  };
};
