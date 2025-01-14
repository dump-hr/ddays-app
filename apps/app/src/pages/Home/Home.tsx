import { useEffect, useRef, useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './Home.module.scss';
import CompactScheduleCard from '../../components/CompactScheduleCard';
import { events } from './events';
import { EventProps } from '../../components/CompactScheduleCard/CompactScheduleCard';
import clsx from 'clsx';

enum Tabs {
  U_Tijeku,
  Nadolazece,
}

const Home = () => {
  const [lecturesTab, setLecturesTab] = useState<string | number>(
    Tabs.U_Tijeku,
  );
  const [snappedCardIndex, setSnappedCardIndex] = useState(0);

  function getCurrentEvents() {
    const currentEvents = [] as EventProps[];

    const currentLecture = events
      .filter((event) => event.type === 'lecture')
      .find((event) => {
        const now = new Date().getTime();
        const start = new Date(event.startsAt).getTime();
        const end = new Date(event.endsAt).getTime();

        return now >= start && now <= end;
      }) as EventProps;

    if (currentLecture) currentEvents.push(currentLecture);

    const currentWorkshop = events
      .filter((event) => event.type === 'workshop')
      .find((event) => {
        const now = new Date().getTime();
        const start = new Date(event.startsAt).getTime();
        const end = new Date(event.endsAt).getTime();

        return now >= start && now <= end;
      }) as EventProps;

    if (currentWorkshop) currentEvents.push(currentWorkshop);

    const currentPanel = events
      .filter((event) => event.type === 'panel')
      .find((event) => {
        const now = new Date().getTime();
        const start = new Date(event.startsAt).getTime();
        const end = new Date(event.endsAt).getTime();

        return now >= start && now <= end;
      }) as EventProps;

    if (currentPanel) currentEvents.push(currentPanel);

    const currentCampfireTalk = events
      .filter((event) => event.type === 'campfireTalk')
      .find((event) => {
        const now = new Date().getTime();
        const start = new Date(event.startsAt).getTime();
        const end = new Date(event.endsAt).getTime();

        return now >= start && now <= end;
      }) as EventProps;

    if (currentCampfireTalk) currentEvents.push(currentCampfireTalk);

    return currentEvents;
  }

  const currentEvents = getCurrentEvents();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
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
  }, []);

  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section className={c.lectures}>
          <TabGroup setter={setLecturesTab}>
            <Tab id={Tabs.U_Tijeku}>U tijeku</Tab>
            <Tab id={Tabs.Nadolazece}>Nadolazeće</Tab>
          </TabGroup>

          <div className={c.scrollingCards}>
            <div className={c.arrowsContainer}>
              <div className={c.scrollingWrapper} ref={containerRef}>
                {lecturesTab === Tabs.U_Tijeku &&
                  currentEvents.map((event) => (
                    <CompactScheduleCard
                      id={event.name}
                      event={event}
                      className={c.card}
                    />
                  ))}
              </div>
            </div>
            <div className={c.dotsContainer}>
              {currentEvents.map((event, index) => (
                <div
                  key={event.name}
                  className={clsx(c.dot, {
                    [c.active]: index === snappedCardIndex,
                  })}></div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
