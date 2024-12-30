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
      <p className={c.time}>Prije {getPassedTime(time)}</p>
      <div className={c.dottedBreak}></div>
    </div>
  );
};

const getPassedTime = (time: Date) => {
  const now = new Date();
  const diff = now.getTime() - time.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);

  if (diffInMinutes < 1) {
    return 'sada';
  }

  if (diffInMinutes < 60) {
    if (diffInMinutes % 10 === 1 && diffInMinutes !== 11) {
      return `${diffInMinutes} minutu`;
    }

    if (
      diffInMinutes % 10 < 5 &&
      diffInMinutes % 10 !== 0 &&
      (diffInMinutes < 10 || diffInMinutes > 20)
    ) {
      return `${diffInMinutes} minute`;
    }

    return `${diffInMinutes} minuta`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    if (diffInHours % 10 === 1 && diffInHours !== 11) {
      return `${diffInHours} sat`;
    }

    if (diffInHours % 10 < 5 && (diffInHours < 10 || diffInHours > 20)) {
      return `${diffInHours} sata`;
    }

    return `${diffInHours} sati`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays % 10 === 1 && diffInDays !== 11) {
    return `${diffInDays} dan`;
  }

  return `${diffInDays} dana`;
};
