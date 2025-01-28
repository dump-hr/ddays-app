import styles from './NotificationsModal.module.scss';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import TabGroup from '../TabGroup';
import Tab from '../Tab';
import Notification from '../Notification/Notification';
import { notifications } from './notifications.const';
import { useState } from 'react';

enum Tabs {
  Sve,
  Nepročitano,
}

interface NotificationsModalProps {
  setOpenNotifications: (open: boolean) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  setOpenNotifications,
}) => {
  const [expandedNotificationId, setExpandedNotificationId] = useState<
    number | null
  >(null);
  const handleTabChange = () => {};

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div
            className={styles.backButton}
            onClick={() => setOpenNotifications(false)}>
            <img src={ArrowLeft} alt='back' />
          </div>
          <h2 className={styles.title}>NOTIFIKACIJE</h2>
        </div>
        <TabGroup setter={handleTabChange}>
          <Tab id={Tabs.Sve}>Sve</Tab>
          <Tab id={Tabs.Nepročitano}>Nepročitano</Tab>
        </TabGroup>
        <div className={styles.notificationsContainer}>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              title={notification.title}
              content={notification.content}
              time={notification.time}
              expandedNotificationId={expandedNotificationId}
              id={notification.id}
              setExpandedNotificationId={setExpandedNotificationId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
