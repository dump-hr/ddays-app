import styles from './Header.module.scss';

import { useDeviceType } from '../../hooks/UseDeviceType';
import { NotificationBell } from './NotificationBell';
import { HeaderCardsWrapper } from './HeaderCardsWrapper';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';

export const Header = () => {
  const { isMobile } = useDeviceType({});
  const { firstName, isLoggedIn } = useLoggedInUser();

  return (
    <div className={styles.header}>
      <div className={styles.headerGreeting}>
        <h1>
          Hello, {isMobile && <br />} {isLoggedIn ? firstName : 'guest'}!👋🏻
        </h1>
        {isMobile && <NotificationBell />}
      </div>
      <HeaderCardsWrapper />
    </div>
  );
};
