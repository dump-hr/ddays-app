import styles from './Header.module.scss';

import { useDeviceType } from '../../hooks/UseDeviceType';
import { NotificationBell } from './NotificationBell';
import { HeaderCardsWrapper } from './HeaderCardsWrapper';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

type HeaderProps = {
  openCodePopup: () => void;
};

export const Header: React.FC<HeaderProps> = ({ openCodePopup }) => {
  const { isMobile } = useDeviceType({});
  const { data: user } = useLoggedInUser();

  return (
    <div className={styles.header}>
      <div className={styles.headerGreeting}>
        <h1>
          Hello, {isMobile && <br />} {user?.firstName || 'guest'}!👋🏻
        </h1>
        {isMobile && <NotificationBell />}
      </div>
      <HeaderCardsWrapper openCodePopup={openCodePopup} />
    </div>
  );
};
