import CompactScheduleCard from '../../../../components/CompactScheduleCard';
import Tab from '../../../../components/Tab';
import TabGroup from '../../../../components/TabGroup';
import ArrowRight from '../../../../assets/icons/arrow-right.svg';
import { EventWithSpeakerDto } from '@ddays-app/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getLiveEvents, getNextEvents } from '../../eventsHelper';
import c from './EventsSection.module.scss';
import clsx from 'clsx';
import { useGetCurrentEvents } from '@/api/event/useGetCurrentEvents';

enum Tabs {
  Trenutno,
  Uskoro,
}

const EventsSection = () => {
  const [lecturesTab, setLecturesTab] = useState<string | number>(
    Tabs.Trenutno,
  );

  const [snappedCardIndex, setSnappedCardIndex] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState<EventWithSpeakerDto[]>(
    [],
  );

  const { data: events = [] } = useGetCurrentEvents();

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

  const liveEvents = useMemo(() => getLiveEvents(events), [events]);
  const nextEvents = useMemo(() => getNextEvents(events), [events]);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = containerRef.current;

  useEffect(() => {
    if (lecturesTab === Tabs.Trenutno) {
      setDisplayedEvents(liveEvents);
    } else if (lecturesTab === Tabs.Uskoro) {
      setDisplayedEvents(nextEvents);
    }
  }, [lecturesTab, liveEvents, nextEvents]);

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
  }, [container, liveEvents, nextEvents, displayedEvents, events]);

  const handleDotClick = (index: number) => {
    setSnappedCardIndex(index);

    let targetCard: HTMLElement | null = null;

    if (lecturesTab === Tabs.Trenutno) {
      targetCard = currentEventRefs.current[index];
    } else if (lecturesTab === Tabs.Uskoro) {
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
        <Tab id={Tabs.Trenutno}>Trenutno</Tab>
        <Tab id={Tabs.Uskoro}>Uskoro</Tab>
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
              disabled={snappedCardIndex === liveEvents.length - 1}>
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
