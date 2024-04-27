import { EventWithSpeakerDto } from '@ddays-app/types';

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
    case 'lecture':
      return 'PREDAVANJE';
    case 'workshop':
      return 'RADIONICA';
    case 'flyTalk':
      return 'FLY TALK';
    case 'campfireTalk':
      return 'CAMPFIRE TALK';
    case 'other':
      return 'OSTALO';
  }
};

export const getSpeakerCompanyStringForEvent = (event: EventWithSpeakerDto) => {
  if (!event.speaker) {
    return '';
  }

  if (!event.speaker.company) {
    return event.speaker.firstName + ' ' + event.speaker.lastName;
  }

  return (
    event.speaker.firstName +
    ' ' +
    event.speaker.lastName +
    ' / ' +
    event.speaker.title +
    ' @ ' +
    event.speaker.company.name
  );
};
