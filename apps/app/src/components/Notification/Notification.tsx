import c from './Notification.module.scss';

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
      <h4 className={c.title}>{title}</h4>
      {content.length < maxContentLength ? (
        <p className={c.content}>{content}</p>
      ) : (
        <div className={c.flex}>
          <p className={c.content}>{content.slice(0, maxContentLength)}...</p>
          <button className={c.expandButton}>Proširi</button>
        </div>
      )}
      <p className={c.time}>{time}</p>
    </div>
  );
};

export default Notification;
