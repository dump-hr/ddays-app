// import { useEffect, useState } from 'react';
import c from './Notification.module.scss';
import clsx from 'clsx';

type NotificationProps = {
  title: string;
  content: string;
  time: string;
};

//TODO: function that returns time string ex: 1 h ago or 10 min ago

const maxContentLength = 129;

const Notification: React.FC<NotificationProps> = ({
  title,
  content,
  time,
}) => {
  return (
    <div className={c.notificationWrapper}>
      <div className={clsx(c.flex, c.titleWrapper)}>
        <h4 className={c.title}>{title}</h4>
        <div className={c.orangeDot}></div>
      </div>
      {content.length < maxContentLength ? (
        <p className={c.content}>{content}</p>
      ) : (
        <div className={c.flex}>
          <p
            className={c.content}
            style={{
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              display: '-webkit-box',
            }}>
            {content}...
          </p>
          <button className={c.expandButton}>Proširi</button>
        </div>
      )}
      <p className={c.time}>{time}</p>
      <div className={c.dottedBreak}></div>
    </div>
  );
};

export default Notification;
