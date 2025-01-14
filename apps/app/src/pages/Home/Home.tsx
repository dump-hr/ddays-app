import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './Home.module.scss';
import CompactScheduleCard from '../../components/CompactScheduleCard';
import { events } from './events';
import { EventProps } from '../../components/CompactScheduleCard/CompactScheduleCard';

enum Tabs {
  U_Tijeku,
  Nadolazece,
}

const Home = () => {
  const [lecturesTab, setLecturesTab] = useState<string | number>(
    Tabs.U_Tijeku,
  );

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

  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section className={c.lectures}>
          <TabGroup setter={setLecturesTab}>
            <Tab id={Tabs.U_Tijeku}>U tijeku</Tab>
            <Tab id={Tabs.Nadolazece}>Nadolazeće</Tab>
          </TabGroup>

          <div className={c.scrollingWrapper}>
            {lecturesTab === Tabs.U_Tijeku &&
              getCurrentEvents().map((event) => (
                <CompactScheduleCard id={event.name} event={event} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
