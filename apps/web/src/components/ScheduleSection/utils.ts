import { EventType, SpeakerWithCompanyDto } from '@ddays-app/types';

export const getEventTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  const minutes = date.getMinutes();
  const hours = date.getHours();

  const hoursString = hours.toString();
  let minutesString = minutes.toString();

  if (minutes < 10) {
    minutesString = '0' + minutes.toString();
  }

  return hoursString + ':' + minutesString;
};

export const getEventTypeTranslation = (type: string) => {
  switch (type) {
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
      return null;
  }
};

export const getThemeShort = (theme: string) => {
  switch (theme) {
    case 'DEV':
      return 'DEV';
    case 'DESIGN':
      return 'DIZ';
    case 'MARKETING':
      return 'MARK';
    case 'TECH':
      return 'TECH';
  }
};

export const getSpeakerCompanyStringForEvent = (
  speaker: SpeakerWithCompanyDto,
) => {
  if (!speaker) {
    return '';
  }

  if (!speaker.company?.name) {
    return speaker.firstName + ' ' + speaker.lastName + ' / ' + speaker.title;
  }

  return (
    speaker.firstName +
    ' ' +
    speaker.lastName +
    ' / ' +
    speaker.title +
    ' @ ' +
    speaker.company.name
  );
};
