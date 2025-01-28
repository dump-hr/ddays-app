import styles from './Header.module.scss';

import { useDeviceType } from '../../hooks/UseDeviceType';
import { NotificationBell } from './NotificationBell';
import { NotificationsModal } from '../NotificationsModal';
import { HeaderCardsWrapper } from './HeaderCardsWrapper';
import { useState } from 'react';

export const Header = () => {
  const { isMobile } = useDeviceType({});
  const [isOpenNotifications, setOpenNotifications] = useState(false);
  return (
    <div className={styles.header}>
      <div className={styles.headerGreeting}>
        <h1>Hello, {isMobile && <br />} Mihaela! 👋🏻</h1>

        {isMobile && (
          <NotificationBell setOpenNotifications={setOpenNotifications} />
        )}
      </div>

      <HeaderCardsWrapper />
      {isOpenNotifications && (
        <NotificationsModal setOpenNotifications={setOpenNotifications} />
      )}
    </div>
  );
};
