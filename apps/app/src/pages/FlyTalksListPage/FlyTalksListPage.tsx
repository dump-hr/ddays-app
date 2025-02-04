import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './FlyTalksListPage.module.scss';
import Button from '../../components/Button';
import star from '../../assets/icons/star.svg';
import warning from '../../assets/images/warning.png';
import { useNavigate } from 'react-router-dom';

const groupsMock = [
  {
    id: 1,
    start: '10:30',
    end: '11:30',
    day: 1,
    participantsNumber: 10,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: true,
  },
  {
    id: 2,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 10,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: false,
  },
  {
    id: 3,
    start: '11:30',
    end: '12:30',
    day: 1,
    participantsNumber: 25,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: false,
  },
  {
    id: 4,
    start: '10:30',
    end: '11:30',
    day: 2,
    participantsNumber: 10,
    companies: ['venio', 'profico', 'travelSoft', 'hrCloud'],
    hasUserApplied: false,
  },
  {
    id: 5,
    start: '11:30',
    end: '12:30',
    day: 2,
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

interface FlyTalksGroupProps {
  key: number;
  group: {
    id: number;
    start: string;
    end: string;
    participantsNumber: number;
    companies: string[];
    hasUserApplied: boolean;
  };
}

const FlyTalksGroup: React.FC<FlyTalksGroupProps> = ({ key, group }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    if (!group.hasUserApplied) {
      navigate(`/app/fly-talks-apply?id=${group.id}`);
    }
  };

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
        <Button
          variant='orange'
          className={c.applyButton}
          onClick={handleApplyClick}>
          {group.hasUserApplied ? 'Odjavi termin' : 'Prijavi'}
        </Button>
      </div>
      <div className={c.applianceDisclaimer}>
        <img src={warning} alt='' />
        <p>
          Nakon prijave sačekaj potvrdu firme. Možeš prijaviti samo jedan fly
          talk.
        </p>
      </div>
    </div>
  );
};

export default FlyTalksListPage;
