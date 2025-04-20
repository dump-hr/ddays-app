import styles from './DesktopNavigation.module.scss';
import { ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationBell } from '../Header/NotificationBell';
import sprite from '../../assets/sprite.svg';
import DesktopNotificationsPopup from '@/pages/Home/popups/DesktopNotificationsPopup';
import { NAVIGATION_TAB_ID, navigationTabs } from '@/router/navigationTabs';

export const DesktopNavigation = (): ReactElement => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabChange = (tab: NAVIGATION_TAB_ID) => {
    navigate(navigationTabs[tab].route);
  };

  return (
    <div className={styles.container}>
      {navigationTabs.map((tab) => (
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
