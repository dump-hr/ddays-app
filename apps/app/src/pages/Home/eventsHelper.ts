import { EventWithSpeakerDto } from '@ddays-app/types';

function filterAndSortEventByType(events: EventWithSpeakerDto[], type: string) {
  return events
    .filter((event) => event.type === type)
    .sort((a, b) => {
      const startsAtA = new Date(a.startsAt);
      const startsAtB = new Date(b.startsAt);

      return startsAtA.getTime() - startsAtB.getTime();
    }) as EventWithSpeakerDto[];
}

function getLiveEvent(events: EventWithSpeakerDto[]) {
  const now = new Date();

  return events
    .filter((event) => {
      const startsAt = new Date(event.startsAt);
      const endsAt = new Date(event.endsAt);

      return now >= startsAt && now <= endsAt;
    })
    .at(0) as EventWithSpeakerDto;
}

export function getLiveEvents(events: EventWithSpeakerDto[]) {
  const lectures = filterAndSortEventByType(events, 'lecture');
  const workshops = filterAndSortEventByType(events, 'workshop');
  const panels = filterAndSortEventByType(events, 'panel');
  const campfireTalks = filterAndSortEventByType(events, 'campfireTalk');

  const liveLecture = getLiveEvent(lectures);
  const liveWorkshop = getLiveEvent(workshops);
  const livePanel = getLiveEvent(panels);
  const liveCampfireTalk = getLiveEvent(campfireTalks);

  return [liveLecture, liveWorkshop, livePanel, liveCampfireTalk].filter(
    (event) => event,
  ) as EventWithSpeakerDto[];
}

export function getNextEvents(events: EventWithSpeakerDto[]) {
  const lectures = filterAndSortEventByType(events, 'lecture');
  const workshops = filterAndSortEventByType(events, 'workshop');
  const panels = filterAndSortEventByType(events, 'panel');
  const campfireTalks = filterAndSortEventByType(events, 'campfireTalk');

  console.log(lectures);

  const nextLectures = lectures.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventWithSpeakerDto[];

  const nextWorkshops = workshops.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventWithSpeakerDto[];

  const nextPanels = panels.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventWithSpeakerDto[];

  const nextCampfireTalks = campfireTalks.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventWithSpeakerDto[];

  return [
    nextLectures.at(0),
    nextWorkshops.at(0),
    nextPanels.at(0),
    nextCampfireTalks.at(0),
  ].filter((event) => {
    if (!event) return false;

    const startsAt = new Date(event.startsAt);
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);

    return startsAt >= startOfDay && startsAt < endOfDay;
  }) as EventWithSpeakerDto[];
}

export async function fetchEvents(): Promise<EventWithSpeakerDto[] | undefined> {
  try {
    const response = await fetch('/api/event/with-speaker');
    if (!response.ok) {
      throw new Error('Failed to fetch events with speakers');
    }
    const data = await response.json();
    console.log(data);
    return data as EventWithSpeakerDto[];
  } catch (error) {
    console.error('Error fetching events with speakers:', error);
  }
}