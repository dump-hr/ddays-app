import styles from './NotificationsSection.module.scss';
import Notification from '@/components/Notification';
import TabGroup from '../TabGroup';
import Tab from '../Tab';
import IconBell from '@/assets/icons/icon-bell.svg';
import { useState, useEffect, useMemo } from 'react';
import { useGetUserNotifications } from '@/api/notification/useGetUserNotifications';
import { NotificationResponseDto, NotificationStatus } from '@ddays-app/types';

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

  const { data: notifications } = useGetUserNotifications();

  const handleTabChange = (tab: string | number) => {
    setNotificationsTab(tab);
  };

  const unreadNotifications = useMemo(
    () =>
      notifications?.filter(
        (notification) => notification.status !== NotificationStatus.READ,
      ),
    [notifications],
  );

  useEffect(() => {
    if (unreadNotifications?.length === 0) {
      setDisplayedNotifications([]);
      return;
    }
    setDisplayedNotifications(notifications || []);

    if (notificationsTab === Tabs.Sve) {
      setDisplayedNotifications(notifications || []);
    } else if (notificationsTab === Tabs.Nepročitano) {
      setDisplayedNotifications(unreadNotifications || []);
      localStorage.setItem(
        'readNotifications',
        JSON.stringify(unreadNotifications),
      );
    }
  }, [notificationsTab, unreadNotifications, notifications]);

  const [displayedNotifications, setDisplayedNotifications] = useState<
    NotificationResponseDto[]
  >([]);

  return (
    <>
      {displayedNotifications.length !== 0 ? (
        <>
          <TabGroup setter={handleTabChange}>
            <Tab id={Tabs.Sve}>Sve</Tab>
            <Tab id={Tabs.Nepročitano}>Nepročitano</Tab>
          </TabGroup>

          <div className={styles.notificationsContainer}>
            {displayedNotifications?.map((notification, index) => (
              <Notification
                key={notification.notificationId}
                index={index}
                notification={notification.notification}
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
