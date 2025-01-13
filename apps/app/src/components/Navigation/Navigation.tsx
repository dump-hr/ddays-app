import { ReactElement, useState } from 'react';
import styles from './Navigation.module.scss';
import sprite from '../../assets/sprite.svg';

enum Tabs {
  HOME,
  SCHEDULE,
  FLY_TALKS,
  COMPANIES,
  PROFILE,
}

type TabInfo = {
  id: Tabs;
  icon: string;
  width: number;
  height: number;
};

const tabs: TabInfo[] = [
  { id: Tabs.HOME, icon: 'home-icon', width: 24, height: 24 },
  { id: Tabs.SCHEDULE, icon: 'schedule-icon', width: 25, height: 24 },
  { id: Tabs.FLY_TALKS, icon: 'fly-talks-icon', width: 22, height: 24 },
  { id: Tabs.COMPANIES, icon: 'companies-icon', width: 23, height: 24 },
  { id: Tabs.PROFILE, icon: 'profile-icon', width: 22, height: 22 },
];

export const Navigation = (): ReactElement => {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.HOME);

  const handleTabChange = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.iconWrapper} ${
            selectedTab === tab.id ? styles.activeIcon : ''
          }`}
          onClick={() => handleTabChange(tab.id)}>
          <svg width={tab.width} height={tab.height} className={styles.icon}>
            <use href={`${sprite}#${tab.icon}`} />
          </svg>
        </div>
      ))}
    </div>
  );
};
