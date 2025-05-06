import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './FlyTalksList.module.scss';
import FlyTalksGroup from '../../components/FlyTalksGroup';
import { useGetAllFlyTalkGroups } from '@/api/flyTalks/useGetGroupCompanies';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

const FlyTalksList = () => {
  enum Tabs {
    first_day,
    second_day,
  }
  const [selectedTab, setSelectedTab] = useState<number>(Tabs.first_day);

  const handleTabChange = (tab: string) => {
    setSelectedTab(Number(tab));
  };

  const { data: event, refetch } = useGetAllFlyTalkGroups();
  const { data: currentUser } = useLoggedInUser();
  const groups =
    event?.map((event) => ({
      id: event.id,
      start: event.startsAt.split('T')[1].slice(0, 5),
      end: event.endsAt.split('T')[1].slice(0, 5),
      day: event.startsAt.split('T')[0] === '2025-05-23' ? 1 : 2,
      participantsNumber: Array.isArray(event.users) ? event.users.length : 0,
      hasUserApplied: Array.isArray(event.users)
        ? event.users.some((user) => user.id === currentUser?.id)
        : false,
      companies: Array.isArray(event.companies)
        ? event.companies.map((company) => ({
            ...company,
            logoImage: company.logoImage || '',
          }))
        : [],
    })) || [];

  const hasUserAlreadyAppliedOnDay = groups.some(
    (group) => group.day === selectedTab + 1 && group.hasUserApplied === true,
  );

  return (
    <div className={c.page}>
      <header>
        <p>Fly Talks</p>
      </header>
      <main>
        <div className={c.tabGroup}>
          <TabGroup setter={handleTabChange}>
            <Tab id={Tabs.first_day}>23. 5.</Tab>
            <Tab id={Tabs.second_day}>24. 5.</Tab>
          </TabGroup>
        </div>
        <p className={c.listInfoText}>
          Nakon prijave obavezno ostavi link na GitHub ili LinkedIn, te
          predstavi se u kratkim crtama što bolje možeš. Na temelju tog opisa i
          projekata na GitHubu firme ce odabrati kandidate za razgovor.
        </p>
        <div className={c.groupsList}>
          {selectedTab === Tabs.first_day &&
            groups
              .filter((group) => group.day === 1)
              .map((group, i) => (
                <FlyTalksGroup
                  key={i}
                  group={group}
                  hasUserAlreadyAppliedOnDay={hasUserAlreadyAppliedOnDay}
                  refetch={refetch}
                />
              ))}
          {selectedTab === Tabs.second_day &&
            groups
              .filter((group) => group.day === 2)
              .map((group, i) => (
                <FlyTalksGroup
                  key={i}
                  group={group}
                  hasUserAlreadyAppliedOnDay={hasUserAlreadyAppliedOnDay}
                  refetch={refetch}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default FlyTalksList;
