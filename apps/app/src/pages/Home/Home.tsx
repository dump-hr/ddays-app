import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './Home.module.scss';
import CompactScheduleCard from '../../components/CompactScheduleCard';

const Home = () => {
  const [, setLecturesTab] = useState<string>('tab1');

  /*
  type EventType =
  | 'lecture'
  | 'workshop'
  | 'flyTalk'
  | 'campfireTalk'
  | 'panel'
  | 'other';
type EventTheme = 'dev' | 'design' | 'marketing' | 'tech';

type Speaker = {
  firstName: string;
  lastName: string;
  title: string;
  logoImage: string;
  thumbnailUrl: string;
};

export type EventProps = {
  name: string;
  description?: string;
  type: EventType;
  theme: EventTheme;
  startsAt: string;
  endsAt: string;
  requirements?: string[];
  speakers: Speaker[];
  moderator?: Speaker;
};

type CompactScheduleCardProps = {
  event: EventProps;
};
  */

  const events = [
    {
      name: 'React Hooks',
      description: 'Learn how to use React Hooks',
      type: 'lecture',
      theme: 'dev',
      startsAt: '2025-01-13T10:00:00Z',
      endsAt: '2025-01-13T18:00:00Z',
      requirements: ['Basic React knowledge'],
      speakers: [
        {
          firstName: 'John',
          lastName: 'Doe',
          title: 'Senior Developer',
          logoImage: 'logo.png',
          thumbnailUrl: 'thumbnail.png',
        },
      ],
    },
  ];

  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section className={c.lectures}>
          <TabGroup setter={setLecturesTab}>
            <Tab id='u-tijeku'>U tijeku</Tab>
            <Tab id='nadolazece'>Nadolazeće</Tab>
          </TabGroup>
          <CompactScheduleCard event={events[0]} />
        </section>
      </main>
    </div>
  );
};

export default Home;
