import { useEffect, useRef, useState } from 'react';
import { NotificationDto } from '@ddays-app/types';
import { getPassedTime } from '../../helpers/getPassedTime';
import c from './Notification.module.scss';
import clsx from 'clsx';

interface NotificationProps {
  index: number;
  notification: NotificationDto;
  expandedNotificationId: number | null;
  setExpandedNotificationId: (id: number | null) => void;
  notificationsLength: number;
}

const Notification: React.FC<NotificationProps> = ({
  index,
  notification,
  expandedNotificationId,
  setExpandedNotificationId,
  notificationsLength,
}) => {
  const [showExpandButton, setShowExpandButton] = useState(false);
  const isExpanded = expandedNotificationId === notification.id;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setShowExpandButton(
        ref.current.scrollHeight !== ref.current.clientHeight,
      );
    }
  }, [expandedNotificationId]);

  return (
    <div className={c.notificationWrapper}>
      <div className={clsx(c.flex, c.titleWrapper)}>
        <h4 className={c.title}>{notification.title}</h4>
        <div className={c.orangeDot}></div>
      </div>

      <div className={c.flex}>
        <p
          ref={ref}
          className={c.content}
          style={
            !isExpanded
              ? {
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  display: '-webkit-box',
                }
              : undefined
          }>
          {notification.content}
          {showExpandButton && '...'}
        </p>
        {showExpandButton && (
          <button
            className={c.expandButton}
            onClick={() => {
              setExpandedNotificationId(notification.id);
              setShowExpandButton(false);
            }}>
            Proširi
          </button>
        )}
      </div>
      <p className={c.time}>{getPassedTime(notification.activatedAt)}</p>
      {notificationsLength - 1 !== index && (
        <div className={c.dottedBreak}></div>
      )}
    </div>
  );
};

export default Notification;
