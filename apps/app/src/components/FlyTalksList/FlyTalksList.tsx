import { useState } from 'react';
import Tab from '../Tab';
import TabGroup from '../TabGroup';
import c from './FlyTalksList.module.scss';
import FlyTalksGroup from '../FlyTalksGroup';
import placeholderLogo from '../../assets/images/profico-logo.png'


const groupsMock = [
  {
    id: 1,
    start: '10:30',
    end: '11:30',
    day: 1,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: true,
  },
  {
    id: 2,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
  {
    id: 3,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 25,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
  {
    id: 4,
    start: '10:30',
    end: '11:30',
    day: 2,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
  {
    id: 5,
    start: '11:30',
    end: '12:30',
    day: 2,
    participantsNumber: 10,
    companies: [placeholderLogo, placeholderLogo, placeholderLogo, placeholderLogo],
    hasUserApplied: false,
  },
];

const FlyTalksList = () => {
  enum Tabs {
    first_day,
    second_day,
  }
  const [selectedTab, setSelectedTab] = useState<string | number>(
    Tabs.first_day,
  );

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className={c.page}>
      <header>
        <p>Fly Talks</p>
      </header>
      <main>
        <div className={c.tabGroup}>
          <TabGroup setter={handleTabChange}>
            <Tab id={Tabs.first_day}>23.05</Tab>
            <Tab id={Tabs.second_day}>24.05</Tab>
          </TabGroup>
        </div>
        <p className={c.listInfoText}>
          Nakon prijave obavezno ostavi link na GitHub ili LinkedIn, te
          predstavi se u kratkim crtama što bolje možeš. Na temelju tog opisa i
          projekata na GitHubu firme ce odabrati kandidate za razgovor.
        </p>
        <div className={c.groupsList}>
          {selectedTab === Tabs.first_day &&
            groupsMock
              .filter((group) => group.day === 1)
              .map((group, i) => <FlyTalksGroup key={i} group={group} />)}
          {selectedTab === Tabs.second_day &&
            groupsMock
              .filter((group) => group.day === 2)
              .map((group, i) => <FlyTalksGroup key={i} group={group} />)}
        </div>
      </main>
    </div>
  );
};



export default FlyTalksList;
