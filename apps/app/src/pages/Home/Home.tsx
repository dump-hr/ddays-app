import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './Home.module.scss';
import CompactScheduleCard from '../../components/CompactScheduleCard';
import { events } from './events';

const Home = () => {
  const [, setLecturesTab] = useState<string>('tab1');

  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section className={c.lectures}>
          <TabGroup setter={setLecturesTab}>
            <Tab id='u-tijeku'>U tijeku</Tab>
            <Tab id='nadolazece'>Nadolazeće</Tab>
          </TabGroup>
          <div className={c.scrollingWrapper}>
            <CompactScheduleCard event={events[0]} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
