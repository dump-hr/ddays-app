import sprite from '@/assets/sprite.svg';
import styles from './NotificationBell.module.scss';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@/router/routes';
import { useDeviceType } from '@/hooks/UseDeviceType';
import { Dispatch, SetStateAction } from 'react';
import { useGetNumOfUnreadNotifications } from '@/api/notification/useGetNumOfUnreadNotifications';

interface NotificationBellProps {
  setIsOpenPopup?: Dispatch<SetStateAction<boolean>>;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  setIsOpenPopup = null,
}) => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceType({ breakpoint: 768 });
  const { data: numOfUnreadNotifications } =
    useGetNumOfUnreadNotifications();

  const handleClick = () => {
    if (isMobile) {
      navigate(RouteNames.NOTIFICATIONS);
      return;
    }
    if (setIsOpenPopup) setIsOpenPopup(true);
  };

  return (
    <div className={styles.notificationWrapper} onClick={handleClick}>
      <svg className={styles.notificationIcon} width={26} height={26}>
        <use href={`${sprite}#notification-bell-icon`} />
      </svg>
      {numOfUnreadNotifications && numOfUnreadNotifications.count > 0 && (
        <div className={styles.notificationBadge}>{numOfUnreadNotifications.count}</div>
      )}
    </div>
  );
};
