import { useEffect, useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './SchedulePage.module.scss';
import ClickableTagGroup from '../../components/ClickableTagGroup';
import ClickableTag from '../../components/ClickableTag';
import clsx from 'clsx';
import { EventWithSpeakerDto } from '@ddays-app/types';
import ScheduleCard from '../../components/ScheduleCard';
import { useEventGetAll } from '@/api/event/useEventGetAll';
import { useEventAddToPersonalSchedule } from '@/api/event/useEventAddToPersonalSchedule';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import toast from 'react-hot-toast';
import { useEventGetMySchedule } from '@/api/event/useEventGetMySchedule';
import { useEventRemoveFromPersonalSchedule } from '@/api/event/useEventRemoveFromPersonalSchedule';
import Button from '@/components/Button';
import CalendarLinkPopup from './popups/CalendarLinkPopup';

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

  const { data: events } = useEventGetAll();
  const { data: user } = useLoggedInUser();
  const { data: mySchedule, isLoading: myScheduleIsLoading } =
    useEventGetMySchedule();
  const eventAddToPersonalSchedule = useEventAddToPersonalSchedule();
  const eventRemoveFromPersonalSchedule = useEventRemoveFromPersonalSchedule();

  const [popupIsOpen, setPopupIsOpen] = useState(false);

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

  function handleRemoveFromPersonalSchedule(eventId: number) {
    if (!user) {
      toast.error('Podaci prijavljenog korisnika nisu dostupni!');
      return;
    }

    eventRemoveFromPersonalSchedule.mutate({
      eventId,
      data: {
        userId: user.id,
      },
    });
    return;
  }

  useEffect(() => {
    if (!events) return;
    if (myScheduleIsLoading) return;

    if (activeTab === TabId.MY_SCHEDULE) {
      const filteredEvents = mySchedule
        ?.filter((event) => {
          return (
            activeTag === TagId.ALL ||
            event.theme.toUpperCase() === activeTag.toUpperCase()
          );
        })
        .sort((a, b) => {
          return (
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
          );
        });

      setFilteredEvents(filteredEvents || []);
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
    <>
      <main className={c.main}>
        <h1 className={c.pageTitle}>Raspored</h1>
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
              <Button variant='orange' onClick={() => setPopupIsOpen(true)}>
                Poveži s mojim kalendarom
              </Button>
            )}
            {filteredEvents.map((event, i) => (
              <ScheduleCard
                handleAddToPersonalSchedule={() =>
                  handleAddToPersonalSchedule(event.id)
                }
                handleRemoveFromPersonalSchedule={() =>
                  handleRemoveFromPersonalSchedule(event.id)
                }
                key={i}
                event={event}
                isAddedToSchedule={mySchedule?.some((e) => e.id === event.id)}
              />
            ))}

            {filteredEvents.length === 0 && (
              <p className={c.noEvents}>
                Trenutno ne postoji niti jedan događaj koji odgovara ovom
                filtru.
              </p>
            )}
          </section>
        </div>
      </main>
      <CalendarLinkPopup
        isOpen={popupIsOpen}
        closePopup={() => setPopupIsOpen(false)}
      />
    </>
  );
};
