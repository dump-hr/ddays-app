import styles from './NotificationsSection.module.scss';
import { notifications } from '@/pages/NotificationsPage/notifications.const';
import Notification from '@/components/Notification';
import TabGroup from '../TabGroup';
import Tab from '../Tab';
import IconBell from '@/assets/icons/icon-bell.svg';
import { useState, useEffect, useMemo } from 'react';

enum Tabs {
  Sve,
  Nepročitano,
}

const NotificationsSection = () => {
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

  const allNotifications = useMemo(
    () =>
      notifications.sort((a, b) => {
        return b.activatedAt!.getTime() - a.activatedAt!.getTime();
      }),
    [notifications],
  );

  const unreadNotifications = useMemo(
    () => allNotifications.filter((notification) => notification.isActive),
    [allNotifications],
  );

  useEffect(() => {
    if (notificationsTab === Tabs.Sve) {
      setDisplayedNotifications(allNotifications);
    } else if (notificationsTab === Tabs.Nepročitano) {
      setDisplayedNotifications(unreadNotifications);
    }
  }, [notificationsTab, allNotifications, unreadNotifications]);
  return (
    <>
      {notifications.length !== 0 ? (
        <>
          <TabGroup setter={handleTabChange}>
            <Tab id={Tabs.Sve}>Sve</Tab>
            <Tab id={Tabs.Nepročitano}>Nepročitano</Tab>
          </TabGroup>

          <div className={styles.notificationsContainer}>
            {displayedNotifications.map((notification, index) => (
              <Notification
                key={notification.id}
                index={index}
                notification={notification}
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
    </>
  );
};

export default NotificationsSection;
