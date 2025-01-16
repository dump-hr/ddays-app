import { useEffect, useMemo, useRef, useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './Home.module.scss';
import CompactScheduleCard from '../../components/CompactScheduleCard';
import { events } from './events';
import clsx from 'clsx';
import { getLiveEvents, getNextEvents } from './eventsHelper';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import { EventWithSpeakerDto } from '@ddays-app/types';

enum Tabs {
  U_Tijeku,
  Nadolazece,
}

const Home = () => {
  const [lecturesTab, setLecturesTab] = useState<string | number>(
    Tabs.U_Tijeku,
  );
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

  const liveEvents = useMemo(() => getLiveEvents(events), []);
  const nextEvents = useMemo(() => getNextEvents(events), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = containerRef.current;

  useEffect(() => {
    if (lecturesTab === Tabs.U_Tijeku) {
      setDisplayedEvents(liveEvents);
    } else if (lecturesTab === Tabs.Nadolazece) {
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
  }, [container, liveEvents, nextEvents, displayedEvents]);

  const handleDotClick = (index: number) => {
    setSnappedCardIndex(index);

    let targetCard: HTMLElement | null = null;

    if (lecturesTab === Tabs.U_Tijeku) {
      targetCard = currentEventRefs.current[index];
    } else if (lecturesTab === Tabs.Nadolazece) {
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
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section className={c.lectures}>
          <TabGroup setter={handleTabChange}>
            <Tab id={Tabs.U_Tijeku}>U tijeku</Tab>
            <Tab id={Tabs.Nadolazece}>Nadolazeće</Tab>
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
      </main>
    </div>
  );
};

export default Home;
