import { ReactElement, useState } from 'react';
import styles from './Navigation.module.scss';
import sprite from '../../assets/sprite.svg';
import { RouteNames } from '@/router/routes';
import { useNavigate } from 'react-router-dom';

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
  route: string;
};

const tabs: TabInfo[] = [
  {
    id: Tabs.HOME,
    icon: 'home-icon',
    width: 24,
    height: 24,
    route: RouteNames.HOME,
  },
  {
    id: Tabs.SCHEDULE,
    icon: 'schedule-icon',
    width: 25,
    height: 24,
    route: RouteNames.SCHEDULE,
  },
  {
    id: Tabs.FLY_TALKS,
    icon: 'fly-talks-icon',
    width: 22,
    height: 24,
    route: RouteNames.FLY_TALKS,
  },
  {
    id: Tabs.COMPANIES,
    icon: 'companies-icon',
    width: 23,
    height: 24,
    route: RouteNames.COMPANIES,
  },
  {
    id: Tabs.PROFILE,
    icon: 'profile-icon',
    width: 22,
    height: 22,
    route: RouteNames.PROFILE,
  },
];

export const Navigation = (): ReactElement => {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.HOME);
  const navigate = useNavigate();

  const handleTabChange = (tab: Tabs) => {
    setSelectedTab(tab);
    navigate(tabs[tab].route);
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
