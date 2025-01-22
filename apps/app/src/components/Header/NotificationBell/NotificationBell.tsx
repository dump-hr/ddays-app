import sprite from './../../../assets/sprite.svg';
import styles from './NotificationBell.module.scss';

export const NotificationBell = () => {
  return (
    <div className={styles.notificationWrapper}>
      <svg className={styles.notificationIcon} width={32} height={32}>
        <use href={`${sprite}#notification-bell-icon`} />
      </svg>

      <div className={styles.notificationBadge}>3</div>
    </div>
  );
};
