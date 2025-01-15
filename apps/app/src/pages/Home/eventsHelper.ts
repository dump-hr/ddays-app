import { EventProps } from '../../components/CompactScheduleCard/CompactScheduleCard';

function filterAndSortEventByType(events: EventProps[], type: string) {
  return events
    .filter((event) => event.type === type)
    .sort((a, b) => {
      const startsAtA = new Date(a.startsAt);
      const startsAtB = new Date(b.startsAt);

      return startsAtA.getTime() - startsAtB.getTime();
    }) as EventProps[];
}

function getLiveEvent(events: EventProps[]) {
  const now = new Date();

  return events
    .filter((event) => {
      const startsAt = new Date(event.startsAt);
      const endsAt = new Date(event.endsAt);

      return now >= startsAt && now <= endsAt;
    })
    .at(0) as EventProps;
}

export function getLiveEvents(events: EventProps[]) {
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
  ) as EventProps[];
}

export function getNextEvents(events: EventProps[]) {
  const lectures = filterAndSortEventByType(events, 'lecture');
  const workshops = filterAndSortEventByType(events, 'workshop');
  const panels = filterAndSortEventByType(events, 'panel');
  const campfireTalks = filterAndSortEventByType(events, 'campfireTalk');

  const nextLectures = lectures.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventProps[];

  const nextWorkshops = workshops.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventProps[];

  const nextPanels = panels.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventProps[];

  const nextCampfireTalks = campfireTalks.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const now = new Date();

    return startsAt > now;
  }) as EventProps[];

  return [
    nextLectures.at(0),
    nextWorkshops.at(0),
    nextPanels.at(0),
    nextCampfireTalks.at(0),
  ].filter((event) => event) as EventProps[];
}
