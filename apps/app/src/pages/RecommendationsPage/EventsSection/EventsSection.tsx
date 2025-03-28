import ArrowRight from '../../../assets/icons/arrow-right.svg';
import { EventWithSpeakerDto } from '@ddays-app/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import c from './EventsSection.module.scss';
import { events } from './events';
import clsx from 'clsx';
import TabGroup from '@/components/TabGroup';
import Tab from '@/components/Tab';
import CompactScheduleCard from '@/components/CompactScheduleCard';

enum Tabs {
  DAY_1,
  DAY_2,
}

const EventsSection = () => {
  const [lecturesTab, setLecturesTab] = useState<string | number>(Tabs.DAY_1);

  const [snappedCardIndex, setSnappedCardIndex] = useState(0);
  const [displayedEvents, setDisplayedEvents] =
    useState<EventWithSpeakerDto[]>(events);

  const handleTabChange = (tab: string) => {
    setLecturesTab(tab);
    setSnappedCardIndex(0);
    if (container) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  function filterEventsByDate(day: number) {
    const date = new Date(day === 1 ? '2025-05-23' : '2025-05-24');
    return events.filter((event) => {
      const eventDate = new Date(event.startsAt);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }

  const eventsDay1 = useMemo(() => filterEventsByDate(1), []);
  const eventsDay2 = useMemo(() => filterEventsByDate(2), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = containerRef.current;

  useEffect(() => {
    if (lecturesTab === Tabs.DAY_1) {
      setDisplayedEvents(eventsDay1);
    } else if (lecturesTab === Tabs.DAY_2) {
      setDisplayedEvents(eventsDay2);
    }
  }, [lecturesTab, eventsDay1, eventsDay2]);

  useEffect(() => {
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const snappedEntry = entries.find(
          (entry) => entry.isIntersecting && entry.intersectionRatio === 1,
        );
        if (snappedEntry) {
          const index = items.indexOf(snappedEntry.target as HTMLElement);
          setSnappedCardIndex(index);
        }
      },
      {
        root: container,
        threshold: 1,
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [container, displayedEvents]);

  const handleDotClick = (index: number) => {
    setSnappedCardIndex(index);

    let targetCard: HTMLElement | null = null;

    if (lecturesTab === Tabs.DAY_1) {
      targetCard = currentEventRefs.current[index];
    } else if (lecturesTab === Tabs.DAY_2) {
      targetCard = nextEventRefs.current[index];
    }

    if (targetCard) {
      const container = targetCard.parentElement;
      if (container) {
        const scrollLeft = targetCard.offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section className={c.lectures}>
      <TabGroup setter={handleTabChange}>
        <Tab id={Tabs.DAY_1}>23. svibnja</Tab>
        <Tab id={Tabs.DAY_2}>24. svibnja</Tab>
      </TabGroup>

      <div className={c.scrollingCards}>
        <div className={c.arrowsContainer}>
          {displayedEvents.length !== 0 && (
            <button
              className={c.arrow}
              onClick={() => handleDotClick(snappedCardIndex - 1)}
              disabled={snappedCardIndex === 0}>
              <img src={ArrowRight} alt='' />
            </button>
          )}
          <div className={c.scrollingWrapper} ref={containerRef}>
            {displayedEvents.map((event, i) => (
              <CompactScheduleCard
                id={event.name}
                key={i}
                event={event}
                className={c.card}
                ref={(el) => (currentEventRefs.current[i] = el)}
              />
            ))}
            <p
              className={clsx(c.noEvents, {
                [c.hidden]: displayedEvents.length > 0,
              })}>
              Nažalost, nije pronađen niti jedan događaj.
            </p>
          </div>
          {displayedEvents.length !== 0 && (
            <button
              className={c.arrow}
              onClick={() => handleDotClick(snappedCardIndex + 1)}
              disabled={snappedCardIndex === displayedEvents.length - 1}>
              <img src={ArrowRight} alt='' />
            </button>
          )}
        </div>
        <div
          className={clsx(c.dotsContainer, {
            [c.hidden]: displayedEvents.length <= 1,
          })}>
          {displayedEvents.map((_, index) => (
            <div
              key={index}
              className={clsx(c.dot, {
                [c.active]: index === snappedCardIndex,
              })}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default EventsSection;
