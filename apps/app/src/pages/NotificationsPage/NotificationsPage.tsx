import { useNavigate } from 'react-router-dom';

import styles from './NotificationsPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

import { RouteNames } from '../../router/routes';
import NotificationsSection from '@/components/NotificationsSection/NotificationsSection';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.wrapper} />
      <div className={styles.notificationWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div
              className={styles.backButton}
              onClick={() => navigate(RouteNames.HOME)}>
              <img src={ArrowLeft} alt='back' />
            </div>
            <h2 className={styles.title}>OBAVIJESTI</h2>
          </div>
          <div style={{ height: '100%' }}>
            <NotificationsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
