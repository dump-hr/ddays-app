import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotificationsPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import IconBell from '@/assets/icons/icon-bell.svg';

import TabGroup from '../../components/TabGroup';
import Tab from '../../components/Tab';
import Notification from '../../components/Notification/Notification';
import { notifications } from './notifications.const';
import { RouteNames } from '../../router/routes';

enum Tabs {
  Sve,
  Nepročitano,
}

export const NotificationsPage: React.FC = () => {
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

  const navigate = useNavigate();
  const allNotifications = useMemo(
    () =>
      notifications
        .sort((a, b) => {
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
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div
            className={styles.backButton}
            onClick={() => navigate(RouteNames.HOME)}>
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
      </div>
    </div>
  );
};

export default NotificationsPage;
