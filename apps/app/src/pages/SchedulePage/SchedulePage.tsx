import { useEffect, useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './SchedulePage.module.scss';
import ClickableTagGroup from '../../components/ClickableTagGroup';
import ClickableTag from '../../components/ClickableTag';
import clsx from 'clsx';
import { EventWithSpeakerDto } from '@ddays-app/types';
import { events } from './events';
import CompactScheduleCard from '../../components/CompactScheduleCard';

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

  useEffect(() => {
    const dateFilter = new Date(
      activeTab === TabId.FIRST_DAY ? '2025-05-23' : '2025-05-24',
    );
    setFilteredEvents(
      events.filter(
        (event) =>
          new Date(event.startsAt).getDate() === dateFilter.getDate() &&
          (event.theme === activeTag.toUpperCase() || activeTag === TagId.ALL),
      ),
    );
  }, [activeTab, activeTag]);

  return (
    <main className={c.main}>
      <h1 className={c.pageTitle}>Raspored</h1>
      <div className={c.contentWrapper}>
        <TabGroup
          setter={() => setActiveTab}
          defaultTab={TabId.FIRST_DAY}
          className={c.contentWidth}>
          <Tab id={TabId.FIRST_DAY}>23.5.</Tab>
          <Tab id={TabId.SECOND_DAY}>24.5.</Tab>
          <Tab id={TabId.MY_SCHEDULE}>Moj raspored</Tab>
        </TabGroup>

        <ClickableTagGroup
          setter={() => setActiveTag}
          className={clsx(c.contentWidth, c.tagGroup)}
          defaultTag={TagId.ALL}>
          <ClickableTag id={TagId.ALL}>Svi</ClickableTag>
          <ClickableTag id={TagId.DEV}>Dev</ClickableTag>
          <ClickableTag id={TagId.DESIGN}>Dizajn</ClickableTag>
          <ClickableTag id={TagId.TECH}>Tech</ClickableTag>
          <ClickableTag id={TagId.MARKETING}>Marketing</ClickableTag>
        </ClickableTagGroup>

        {filteredEvents.map((event) => (
          <CompactScheduleCard id='id' key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
};
