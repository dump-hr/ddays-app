import { useNavigate } from 'react-router-dom';

import styles from './NotificationsPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';

import { RouteNames } from '../../router/routes';
import NotificationsSection from '@/components/NotificationsSection/NotificationsSection';
import { useUpdateReadNotifications } from '@/api/notification/useUpdateReadNotifications';
import { NotificationResponseDto } from '@ddays-app/types';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const { mutate: markNotificationsAsRead } = useUpdateReadNotifications();

  const handleBackClick = () => {
    const readNotifications = localStorage.getItem('readNotifications');
    if (readNotifications) {
      const parsedNotifications: NotificationResponseDto[] =
        JSON.parse(readNotifications);
      const notificationIds = parsedNotifications.map((item) =>
        Number(item.notification.id),
      );
      markNotificationsAsRead(notificationIds, {
        onSuccess: () => {
          localStorage.removeItem('readNotifications');
        },
      });
    }
    navigate(RouteNames.HOME);
  };

  return (
    <>
      <div className={styles.wrapper} />
      <div className={styles.notificationWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.backButton} onClick={handleBackClick}>
              <img src={ArrowLeft} alt='back' />
            </div>
            <h2 className={styles.title}>NOTIFIKACIJE</h2>
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
