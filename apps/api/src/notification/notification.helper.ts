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
