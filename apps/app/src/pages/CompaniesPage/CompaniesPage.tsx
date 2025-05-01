import TabGroup from '@/components/TabGroup';
import c from './CompaniesPage.module.scss';
import Tab from '@/components/Tab';
import { useState } from 'react';
import CompaniesTab from './CompaniesTab';
import JobOffersTab from './JobOffersTab';

export const CompaniesPage = () => {
  enum TABS {
    TVRTKE = 'Tvrtke',
    OGLASI = 'Oglasi',
  }

  const [selectedTab, setSelectedTab] = useState(TABS.TVRTKE as string);

  return (
    <div className={c.page}>
      <header className={c.header}>
        <h2 className={c.title}>Tvrtke</h2>
      </header>
      <main className={c.main}>
        <TabGroup setter={setSelectedTab} className={c.tabGroup}>
          <Tab id={TABS.TVRTKE}>Tvrtke</Tab>
          <Tab id={TABS.OGLASI}>Oglasi</Tab>
        </TabGroup>
        {selectedTab === TABS.TVRTKE && <CompaniesTab />}

        {selectedTab === TABS.OGLASI && <JobOffersTab />}
      </main>
    </div>
  );
};
