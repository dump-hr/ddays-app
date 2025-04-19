import styles from './DesktopNavigation.module.scss';
import { ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationBell } from '../Header/NotificationBell';
import { RouteNames } from '@/router/routes';
import sprite from '../../assets/sprite.svg';
import DesktopNotificationsPopup from '@/pages/Home/popups/DesktopNotificationsPopup';

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
  name: string;
  route: RouteNames;
};

const tabs: TabInfo[] = [
  {
    id: Tabs.HOME,
    icon: 'home-icon',
    width: 24,
    height: 24,
    name: 'Home',
    route: RouteNames.HOME,
  },
  {
    id: Tabs.SCHEDULE,
    icon: 'schedule-icon',
    width: 25,
    height: 24,
    name: 'Raspored',
    route: RouteNames.SCHEDULE,
  },
  {
    id: Tabs.FLY_TALKS,
    icon: 'fly-talks-icon',
    width: 22,
    height: 24,
    name: 'Fly talks',
    route: RouteNames.FLY_TALKS,
  },
  {
    id: Tabs.COMPANIES,
    icon: 'companies-icon',
    width: 23,
    height: 24,
    name: 'Tvrtke',
    route: RouteNames.COMPANIES,
  },
  {
    id: Tabs.PROFILE,
    icon: 'profile-icon',
    width: 22,
    height: 22,
    name: 'Profil',
    route: RouteNames.PROFILE,
  },
];

export const DesktopNavigation = (): ReactElement => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabChange = (tab: Tabs) => {
    navigate(tabs[tab].route);
  };

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.iconWrapper} ${
            tab.route === pathname ? styles.activeIcon : ''
          }`}
          onClick={() => handleTabChange(tab.id)}>
          <svg width={tab.width} height={tab.height} className={styles.icon}>
            <use href={`${sprite}#${tab.icon}`} />
          </svg>
          <p className={styles.tabName}>{tab.name}</p>
        </div>
      ))}
      <div className={styles.notificationBellContainer}>
        <NotificationBell setIsOpenPopup={setIsOpenPopup} />
      </div>
      <DesktopNotificationsPopup
        isOpen={isOpenPopup}
        closePopup={() => setIsOpenPopup(false)}
      />
    </div>
  );
};
