import styles from './Header.module.scss';

import { useDeviceType } from '../../hooks/UseDeviceType';
import { NotificationBell } from './NotificationBell';
import { HeaderCardsWrapper } from './HeaderCardsWrapper';

export const Header = () => {
  const { isMobile } = useDeviceType({});

  return (
    <div className={styles.header}>
      <div className={styles.headerGreeting}>
        <h1>Hello, {isMobile && <br />} Mihaela! 👋🏻</h1>

        {isMobile && (
          <div>
            <NotificationBell />
          </div>
        )}
      </div>

      <HeaderCardsWrapper />
    </div>
  );
};
