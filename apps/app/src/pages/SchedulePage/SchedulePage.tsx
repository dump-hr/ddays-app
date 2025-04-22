import { useEffect, useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './SchedulePage.module.scss';
import ClickableTagGroup from '../../components/ClickableTagGroup';
import ClickableTag from '../../components/ClickableTag';
import clsx from 'clsx';
import { EventWithSpeakerDto } from '@ddays-app/types';
import ScheduleCard from '../../components/ScheduleCard';
import ToggleButton from '../../components/ToggleButton';
import { useEventGetAll } from '@/api/event/useEventGetAll';
import { useEventAddToPersonalSchedule } from '@/api/event/useEventAddToPersonalSchedule';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import toast from 'react-hot-toast';
import { useEventGetMySchedule } from '@/api/event/useEventGetMySchedule';

enum TabId {
  FIRST_DAY = 'first-day',
  SECOND_DAY = 'second-day',
  MY_SCHEDULE = 'my-schedule',
}

enum TagId {
  ALL = 'all',
  DEV = 'dev',
  DESIGN = 'design',
  TECH = 'tech',
  MARKETING = 'marketing',
}

export const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState(TabId.FIRST_DAY);
  const [activeTag, setActiveTag] = useState(TagId.ALL);
  const [filteredEvents, setFilteredEvents] = useState<EventWithSpeakerDto[]>(
    [],
  );
  const [calendarSyncToggled, setCalendarSyncToggled] = useState(false); // BE: postavit na vrijednost iz baze

  const { data: events } = useEventGetAll();
  const { data: user } = useLoggedInUser();
  const { data: mySchedule, isLoading: myScheduleIsLoading } =
    useEventGetMySchedule();
  const eventAddToPersonalSchedule = useEventAddToPersonalSchedule();

  function handleAddToPersonalSchedule(eventId: number) {
    if (!user) {
      toast.error('Podaci prijavljenog korisnika nisu dostupni!');
      return;
    }

    const data: UserToEventDto = {
      userId: user.id,
    };

    eventAddToPersonalSchedule.mutate({ eventId, data });
  }

  useEffect(() => {
    if (!events) return;
    if (myScheduleIsLoading) return;

    if (activeTab === TabId.MY_SCHEDULE) {
      setFilteredEvents(mySchedule || []);
      return;
    }

    const dateFilter = new Date(
      activeTab === TabId.FIRST_DAY ? '2025-05-23' : '2025-05-24',
    ).toDateString();

    setFilteredEvents(
      events.filter((event) => {
        const eventDate = new Date(event.startsAt).toDateString();
        return (
          eventDate === dateFilter &&
          (activeTag === TagId.ALL ||
            event.theme.toUpperCase() === activeTag.toUpperCase())
        );
      }),
    );
  }, [activeTab, activeTag, events, mySchedule, myScheduleIsLoading]);

  return (
    <main className={c.main}>
      <h1 className={c.pageTitle}>Raspored</h1>

      <button onClick={() => console.log(mySchedule)}>getmyschedule</button>

      <div className={c.contentWrapper}>
        <TabGroup
          setter={(id) => setActiveTab(id as TabId)}
          defaultTab={TabId.FIRST_DAY}
          className={c.contentWidth}>
          <Tab id={TabId.FIRST_DAY}>23.5.</Tab>
          <Tab id={TabId.SECOND_DAY}>24.5.</Tab>
          <Tab id={TabId.MY_SCHEDULE}>Moj raspored</Tab>
        </TabGroup>

        <ClickableTagGroup
          setter={(id) => setActiveTag(id as TagId)}
          className={clsx(c.contentWidth, c.tagGroup)}
          defaultTag={TagId.ALL}>
          <ClickableTag id={TagId.ALL}>Svi</ClickableTag>
          <ClickableTag id={TagId.DEV}>Dev</ClickableTag>
          <ClickableTag id={TagId.DESIGN}>Dizajn</ClickableTag>
          <ClickableTag id={TagId.TECH}>Tech</ClickableTag>
          <ClickableTag id={TagId.MARKETING}>Marketing</ClickableTag>
        </ClickableTagGroup>

        <section className={clsx(c.eventsWrapper, c.contentWidth)}>
          {activeTab === TabId.MY_SCHEDULE && (
            <div className={c.toggleWrapper}>
              <ToggleButton
                toggled={calendarSyncToggled}
                onClick={() => setCalendarSyncToggled((prev) => !prev)}
              />
              <p>Poveži s mojim kalendarom</p>
            </div>
          )}
          {filteredEvents.map((event, i) => (
            <ScheduleCard
              clickHandler={() => handleAddToPersonalSchedule(event.id)}
              key={i}
              event={event}
              isAddedToSchedule={mySchedule?.some((e) => e.id === event.id)}
            />
          ))}

          {filteredEvents.length === 0 && (
            <p className={c.noEvents}>
              Trenutno ne postoji niti jedan događaj koji odgovara ovom filtru.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};
