import { EventWithSpeakerDto } from '@ddays-app/types';

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
    ' @' +
    event.speaker.company.name
  );
};
