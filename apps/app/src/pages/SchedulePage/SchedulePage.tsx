import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './SchedulePage.module.scss';
import ClickableTagGroup from '../../components/ClickableTagGroup';
import ClickableTag from '../../components/ClickableTag';

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
        <TabGroup
          setter={() => setActiveTab}
          defaultTab={TabId.FIRST_DAY}
          className={c.contentWidth}>
          <Tab id={TabId.FIRST_DAY}>23.5.</Tab>
          <Tab id={TabId.SECOND_DAY}>24.5.</Tab>
          <Tab id={TabId.MY_SCHEDULE}>Moj raspored</Tab>
        </TabGroup>
        <ClickableTagGroup
          setter={() => setActiveTab}
          className={c.contentWidth}>
          <ClickableTag id='all'>Svi</ClickableTag>
          <ClickableTag id='lecture'>Predavanja</ClickableTag>
          <ClickableTag id='workshop'>Radionice</ClickableTag>
          <ClickableTag id='panel'>Paneli</ClickableTag>

          <ClickableTag id='all'>Svi</ClickableTag>
          <ClickableTag id='lecture'>Predavanja</ClickableTag>
          <ClickableTag id='workshop'>Radionice</ClickableTag>
          <ClickableTag id='panel'>Paneli</ClickableTag>
        </ClickableTagGroup>
      </div>
    </main>
  );
};
