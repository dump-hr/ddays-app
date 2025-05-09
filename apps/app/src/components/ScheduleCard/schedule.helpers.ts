import { EventType, Theme } from '@ddays-app/types';

export function getThemeLabel(eventTheme: Theme) {
  switch (eventTheme) {
    case Theme.DEV:
      return 'DEV';
    case Theme.DESIGN:
      return 'DIZ';
    case Theme.MARKETING:
      return 'MARK';
    case Theme.TECH:
      return 'TECH';
  }
}

export function getTypeLabel(eventType: EventType) {
  switch (eventType) {
    case EventType.LECTURE:
      return 'PREDAVANJE';
    case EventType.WORKSHOP:
      return 'RADIONICA';
    case EventType.FLY_TALK:
      return 'FLY TALK';
    case EventType.CAMPFIRE_TALK:
      return 'CAMPFIRE TALK';
    case EventType.PANEL:
      return 'PANEL';
    case EventType.OTHER:
      return 'OSTALO';
  }
}

export function getTimeFromDate(date: string): string {
  const dateObj = new Date(date);
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
