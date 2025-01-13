import sprite from './../../../assets/sprite.svg';
import styles from './NotificationBell.module.scss';

export const NotificationBell = () => {
  return (
    <svg className={styles.notificationBell} width={32} height={32}>
      <use href={`${sprite}#notification-bell-icon`} width={32} height={32} />
    </svg>
  );
};
