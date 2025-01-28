import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './FlyTalksListPage.module.scss';
import Button from '../../components/Button';
import star from '../../assets/icons/star.svg';

const FirstDayGroupsMock = [
  {
    start: '10:30',
    end: '11:30',
    participantsNumber: 10,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: true,
  },
  {
    start: '11:30',
    end: '12:30',
    participantsNumber: 10,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: false,
  },
  {
    start: '11:30',
    end: '12:30',
    participantsNumber: 25,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: false,
  },
];

const SecondDayGroupsMock = [
  {
    start: '10:30',
    end: '11:30',
    participantsNumber: 10,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: false,
  },
  {
    start: '11:30',
    end: '12:30',
    participantsNumber: 10,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: false,
  },
];

const FlyTalksListPage = () => {
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
        <TabGroup setter={handleTabChange}>
          <Tab id={Tabs.first_day}>23.05</Tab>
          <Tab id={Tabs.second_day}>24.05</Tab>
        </TabGroup>
        <p className={c.listInfoText}>
          Nakon prijave obavezno ostavi link na GitHub ili LinkedIn, te
          predstavi se u kratkim crtama što bolje možeš. Na temelju tog opisa i
          projekata na GitHubu firme ce odabrati kandidate za razgovor.
        </p>
        <div className={c.groupsList}>
          {selectedTab === Tabs.first_day &&
            FirstDayGroupsMock.map((group, i) => (
              <FlyTalksGroup key={i} group={group} />
            ))}
          {selectedTab === Tabs.second_day &&
            SecondDayGroupsMock.map((group, i) => (
              <FlyTalksGroup key={i} group={group} />
            ))}
        </div>
      </main>
    </div>
  );
};

interface FlyTalksGroupProps {
  key: number;
  group: {
    start: string;
    end: string;
    participantsNumber: number;
    companies: string[];
    hasUserApplied: boolean;
  };
}

const FlyTalksGroup: React.FC<FlyTalksGroupProps> = ({ key, group }) => {
  return (
    <div
      className={
        group.hasUserApplied
          ? `${c.group} ${c.groupApplied}`
          : group.participantsNumber < 25
            ? c.group
            : `${c.group} ${c.groupFull}`
      }
      key={key}>
      <div className={c.groupHeader}>
        <div></div>
        <img className={c.starIcon} src={star} alt='' />
        <p>
          {!group.hasUserApplied
            ? `${group.participantsNumber}/25 PRIJAVLJENIH`
            : 'PRIJAVLJEN TERMIN'}
        </p>
      </div>
      <p className={c.groupDuration}>
        {group.start} - {group.end}
      </p>
      <div className={c.companiesList}>
        {group.companies.map((company, i) => (
          <div key={i} className={c.company}>
            <p>0{i + 1}</p>
            <div>{company}</div>
            {i !== 3 && <div className={c.divider}></div>}
          </div>
        ))}
        <Button variant='orange' className={c.applyButton}>
          {group.hasUserApplied ? 'Odjavi termin' : 'Prijavi'}
        </Button>
      </div>
    </div>
  );
};

export default FlyTalksListPage;
