import styles from './Header.module.scss';
import { NotificationBell } from './NotificationBell';
import { HeaderCardsWrapper } from './HeaderCardsWrapper';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

type HeaderProps = {
  openCodePopup: () => void;
};

export const Header: React.FC<HeaderProps> = ({ openCodePopup }) => {
  const { data: user } = useLoggedInUser();

  return (
    <div className={styles.header}>
      <div className={styles.headerGreeting}>
        <h1 className={styles.headerGreetingText}>
          <p>Hej,&nbsp;</p>
          <p>{user?.firstName || 'guest'}!👋🏻</p>
        </h1>
        <div className={styles.notificationBellContainer}>
          <NotificationBell />
        </div>
      </div>
      <HeaderCardsWrapper openCodePopup={openCodePopup} />
    </div>
  );
};
