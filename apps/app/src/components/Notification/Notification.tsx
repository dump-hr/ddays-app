import { useEffect, useRef, useState } from 'react';
import c from './Notification.module.scss';
import clsx from 'clsx';

type NotificationProps = {
  id: number;
  title: string;
  content: string;
  time: Date;
  expandedNotificationId: number | null;
  setExpandedNotificationId: (id: number | null) => void;
};

//TODO: function that returns time string ex: 1 h ago or 10 min ago

const Notification: React.FC<NotificationProps> = ({
  id,
  title,
  content,
  time,
  expandedNotificationId,
  setExpandedNotificationId,
}) => {
  const [showExpandButton, setShowExpandButton] = useState(false);
  const isExpanded = expandedNotificationId === id;

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
        <h4 className={c.title}>{title}</h4>
        <div className={c.orangeDot}></div>
      </div>

      <div className={c.flex}>
        <p
          ref={ref}
          className={c.content}
          style={
            isExpanded
              ? undefined
              : {
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  display: '-webkit-box',
                }
          }>
          {content}
          {showExpandButton && '...'}
        </p>
        {showExpandButton && (
          <button
            className={c.expandButton}
            onClick={() => {
              setExpandedNotificationId(id);
              setShowExpandButton(false);
            }}>
            Proširi
          </button>
        )}
      </div>
      <p className={c.time}>{getPassedTime(time)} ago</p>
      <div className={c.dottedBreak}></div>
    </div>
  );
};

const getPassedTime = (time: Date) => {
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} h`;
  }

  return `${Math.floor(diffInHours / 24)} d`;
};

export default Notification;
