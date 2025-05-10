import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import NotificationsSection from '@/components/NotificationsSection';
import styles from './DesktopNotificationsPopup.module.scss';
import { useUpdateReadNotifications } from '@/api/notification/useUpdateReadNotifications';
import { NotificationResponseDto } from '@ddays-app/types';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const DesktopNotificationsPopup = ({ isOpen, closePopup }: PopupProps) => {
  const { mutate: markNotificationsAsRead } = useUpdateReadNotifications();

  const handleClose = () => {
    closePopup();
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
  };

  return (
    <PopupLayout
      variant='light'
      headerTitleComponent={<>Notifikacije</>}
      closePopup={handleClose}
      isOpen={isOpen}
      desktopStyle='normal'>
      <div className={styles.contentDiv}>
        <NotificationsSection />
      </div>
    </PopupLayout>
  );
};

export default DesktopNotificationsPopup;
