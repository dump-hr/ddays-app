import { ReactElement, useState } from 'react';
import styles from './MobileNavigation.module.scss';
import sprite from '../../assets/sprite.svg';
import { RouteNames } from '@/router/routes';
import { useNavigate } from 'react-router-dom';

enum TabId {
  HOME,
  SCHEDULE,
  FLY_TALKS,
  COMPANIES,
  PROFILE,
}

type TabInfo = {
  id: TabId;
  icon: string;
  width: number;
  height: number;
  route: string;
};

const tabs: TabInfo[] = [
  {
    id: TabId.HOME,
    icon: 'home-icon',
    width: 24,
    height: 24,
    route: RouteNames.HOME,
  },
  {
    id: TabId.SCHEDULE,
    icon: 'schedule-icon',
    width: 25,
    height: 24,
    route: RouteNames.SCHEDULE,
  },
  {
    id: TabId.FLY_TALKS,
    icon: 'fly-talks-icon',
    width: 22,
    height: 24,
    route: RouteNames.FLY_TALKS,
  },
  {
    id: TabId.COMPANIES,
    icon: 'companies-icon',
    width: 23,
    height: 24,
    route: RouteNames.COMPANIES,
  },
  {
    id: TabId.PROFILE,
    icon: 'profile-icon',
    width: 22,
    height: 22,
    route: RouteNames.PROFILE,
  },
];

export const MobileNavigation = (): ReactElement => {
  const currentPath = window.location.pathname;
  const currentTab = tabs.find((tab) => tab.route === currentPath);
  const [selectedTab, setSelectedTab] = useState<TabId>(
    currentTab ? currentTab.id : TabId.HOME,
  );
  const navigate = useNavigate();

  const handleTabChange = (tab: TabId) => {
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
