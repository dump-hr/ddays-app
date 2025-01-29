import { useEffect, useMemo, useState } from 'react';
import styles from './NotificationsModal.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import IconBell from '@/assets/icons/icon-bell.svg';
import TabGroup from '@/components/TabGroup';
import Tab from '@/components/Tab';
import Notification from '@/components/Notification/Notification';
import { notifications } from './notifications.const';

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
  const [notificationsTab, setNotificationsTab] = useState<string | number>(
    Tabs.Sve,
  );
  const [displayedNotifications, setDisplayedNotifications] =
    useState(notifications);

  const handleTabChange = (tab: string) => {
    setNotificationsTab(tab);
  };

  const allNotifications = useMemo(() => notifications, []);
  const unreadNotifications = useMemo(() => notifications.slice(0, 2), []);

  useEffect(() => {
    if (notificationsTab === Tabs.Sve) {
      setDisplayedNotifications(allNotifications);
    } else if (notificationsTab === Tabs.Nepročitano) {
      setDisplayedNotifications(unreadNotifications);
    }
  }, [notificationsTab, allNotifications, unreadNotifications]);

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
        {notifications.length !== 0 ? (
          <>
            <TabGroup setter={handleTabChange}>
              <Tab id={Tabs.Sve}>Sve</Tab>
              <Tab id={Tabs.Nepročitano}>Nepročitano</Tab>
            </TabGroup>
            <div className={styles.notificationsContainer}>
              {displayedNotifications.map((notification) => (
                <Notification
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  content={notification.content}
                  time={notification.time}
                  expandedNotificationId={expandedNotificationId}
                  setExpandedNotificationId={setExpandedNotificationId}
                  notificationsLength={displayedNotifications.length}
                />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noNotificationsContainer}>
            <img src={IconBell} alt='bell' />
            <p className={styles.noNotificationsTitle}>NEMA NOTIFIKACIJA</p>
            <p className={styles.noNotificationsLabel}>
              Nažalost nemamo novosti za tebe, možda uskoro te zatrebamo
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;
