import sprite from '@/assets/sprite.svg';
import styles from './NotificationBell.module.scss';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';

export const NotificationBell: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.notificationWrapper}
      onClick={() => navigate(RouteNames.NOTIFICATIONS)}>
      <svg className={styles.notificationIcon} width={32} height={32}>
        <use href={`${sprite}#notification-bell-icon`} />
      </svg>

      <div className={styles.notificationBadge}>3</div>
    </div>
  );
};
