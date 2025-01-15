import { useEffect, useRef, useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './Home.module.scss';
import CompactScheduleCard from '../../components/CompactScheduleCard';
import { events } from './events';
import clsx from 'clsx';
import { getLiveEvents, getNextEvents } from './eventsHelper';

enum Tabs {
  U_Tijeku,
  Nadolazece,
}

const Home = () => {
  const [lecturesTab, setLecturesTab] = useState<string | number>(
    Tabs.U_Tijeku,
  );
  const [snappedCardIndex, setSnappedCardIndex] = useState(0);

  const handleTabChange = (tab: string) => {
    setLecturesTab(tab);
    setSnappedCardIndex(0);
  };

  const liveEvents = getLiveEvents(events);
  const nextEvents = getNextEvents(events);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nextEventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const container = containerRef.current;

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
        threshold: 1.0,
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [container, liveEvents, nextEvents]);

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
              <div className={c.scrollingWrapper} ref={containerRef}>
                {lecturesTab === Tabs.U_Tijeku &&
                  liveEvents.map((event, i) => (
                    <CompactScheduleCard
                      id={event.name}
                      event={event}
                      className={c.card}
                      ref={(el) => (currentEventRefs.current[i] = el)}
                    />
                  ))}

                {lecturesTab === Tabs.Nadolazece &&
                  nextEvents.map((event, i) => (
                    <CompactScheduleCard
                      id={event.name}
                      event={event}
                      className={c.card}
                      ref={(el) => (nextEventRefs.current[i] = el)}
                    />
                  ))}
              </div>
            </div>
            <div className={c.dotsContainer}>
              {lecturesTab === Tabs.U_Tijeku &&
                liveEvents.map((_, index) => (
                  <div
                    key={index}
                    className={clsx(c.dot, {
                      [c.active]: index === snappedCardIndex,
                    })}
                    onClick={() => handleDotClick(index)}
                  />
                ))}

              {lecturesTab === Tabs.Nadolazece &&
                nextEvents.map((_, index) => (
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
