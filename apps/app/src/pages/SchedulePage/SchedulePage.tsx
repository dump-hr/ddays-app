import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './SchedulePage.module.scss';

enum TabId {
  FIRST_DAY = 'first-day',
  SECOND_DAY = 'second-day',
  MY_SCHEDULE = 'my-schedule',
}

export const SchedulePage = () => {
  const [, setActiveTab] = useState(TabId.FIRST_DAY);

  return (
    <main className={c.main}>
      <h1 className={c.pageTitle}>Raspored</h1>
      <div className={c.contentWrapper}>
        <TabGroup setter={() => setActiveTab} defaultTab={TabId.FIRST_DAY}>
          <Tab id={TabId.FIRST_DAY}>23.5.</Tab>
          <Tab id={TabId.SECOND_DAY}>24.5.</Tab>
          <Tab id={TabId.MY_SCHEDULE}>Moj raspored</Tab>
        </TabGroup>
      </div>
    </main>
  );
};
