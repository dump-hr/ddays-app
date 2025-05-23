import { ReactElement, useState } from 'react';
import styles from './MobileNavigation.module.scss';
import sprite from '../../assets/sprite.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_TAB_ID, navigationTabs } from '@/router/navigationTabs';

export const MobileNavigation = (): ReactElement => {
  const { pathname: currentPath } = useLocation();
  const currentTab = navigationTabs.find((tab) => tab.route === currentPath);
  const [selectedTab, setSelectedTab] = useState<NAVIGATION_TAB_ID>(
    currentTab ? currentTab.id : NAVIGATION_TAB_ID.HOME,
  );
  const navigate = useNavigate();

  const handleTabChange = (tab: NAVIGATION_TAB_ID) => {
    setSelectedTab(tab);
    const tabRoute = navigationTabs.find((t) => t.id === tab)?.route;
    if (tabRoute) {
      navigate(tabRoute);
    }
  };

  return (
    <div className={styles.container}>
      {navigationTabs.map((tab) => (
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
