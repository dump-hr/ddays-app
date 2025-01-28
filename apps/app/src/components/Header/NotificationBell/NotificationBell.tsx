import sprite from './../../../assets/sprite.svg';
import styles from './NotificationBell.module.scss';

interface NotificationBellProps {
  setOpenNotifications: (open: boolean) => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  setOpenNotifications,
}) => {
  return (
    <div className={styles.notificationWrapper} onClick={() => setOpenNotifications(true)}>
      <svg className={styles.notificationIcon} width={32} height={32}>
        <use href={`${sprite}#notification-bell-icon`} />
      </svg>

      <div className={styles.notificationBadge}>3</div>
    </div>
  );
};
