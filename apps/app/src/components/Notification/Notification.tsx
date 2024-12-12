// import { useEffect, useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import c from './Notification.module.scss';
import clsx from 'clsx';

type NotificationProps = {
  id: number;
  title: string;
  content: string;
  time: string;
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
  console.log(expandedNotificationId);

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
      <p className={c.time}>{time}</p>
      <div className={c.dottedBreak}></div>
    </div>
  );
};

export default Notification;
