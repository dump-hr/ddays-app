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

  const { data: notifications, isLoading } = useGetUserNotifications();
  const [localNotifications, setLocalNotifications] = useState<
    NotificationResponseDto[]
  >([]);

  const handleTabChange = (tab: string | number) => {
    setNotificationsTab(tab);
  };

  // Handler to remove a notification from the local state
  const handleRemoveNotification = (notificationId: number) => {
    setLocalNotifications((prev) =>
      prev.filter((n) => n.notificationId !== notificationId),
    );
  };

  const unreadNotifications = useMemo(
    () =>
      localNotifications.filter(
        (notification) => notification.status !== NotificationStatus.READ,
      ),
    [localNotifications],
  );

  useEffect(() => {
    if (!isLoading && notifications) {
      setLocalNotifications(notifications);
    }
  }, [isLoading, notifications]);

  useEffect(() => {
    if (notificationsTab === Tabs.Sve) {
      setDisplayedNotifications(localNotifications);
    } else if (notificationsTab === Tabs.Nepročitano) {
      setDisplayedNotifications(unreadNotifications);
    }
  }, [notificationsTab, localNotifications, unreadNotifications]);

  const [displayedNotifications, setDisplayedNotifications] = useState<
    NotificationResponseDto[]
  >([]);

  return (
    <>
      {localNotifications.length !== 0 ? (
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
                notificationId={notification.notificationId}
                expandedNotificationId={expandedNotificationId}
                setExpandedNotificationId={setExpandedNotificationId}
                notificationsLength={displayedNotifications.length}
                onRemoveNotification={handleRemoveNotification}
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
