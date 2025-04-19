import { useEffect, useRef, useState } from 'react';
import { NotificationDto } from '@ddays-app/types';
import { getPassedTime } from '../../helpers/getPassedTime';
import c from './Notification.module.scss';
import clsx from 'clsx';
import { useUpdateReadNotification } from '@/api/notification/useUpdateReadNotification';

interface NotificationProps {
  index: number;
  notification: NotificationDto;
  notificationId: number; // Add this prop
  expandedNotificationId: number | null;
  setExpandedNotificationId: (id: number | null) => void;
  notificationsLength: number;
  onRemoveNotification: (id: number) => void; // Add this prop
}

const Notification: React.FC<NotificationProps> = ({
  index,
  notification,
  notificationId,
  expandedNotificationId,
  setExpandedNotificationId,
  notificationsLength,
  onRemoveNotification,
}) => {
  const [showExpandButton, setShowExpandButton] = useState(false);
  const isExpanded = expandedNotificationId === notification.id;
  const updateReadNotification = useUpdateReadNotification();

  // Swipe state
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);
  
  const startX = useRef(0);
  const currentX = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const SWIPE_THRESHOLD = 100; // Distance to trigger dismiss

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    currentX.current = e.touches[0].clientX;
    const distance = currentX.current - startX.current;
    
    // Only allow left swipes (negative distance)
    if (distance < 0) {
      setSwipeDistance(distance);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    currentX.current = startX.current;
    setIsSwiping(true);
    
    // Add document-level handlers
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isSwiping) return;
    
    currentX.current = e.clientX;
    const distance = currentX.current - startX.current;
    
    if (distance < 0) {
      setSwipeDistance(distance);
    }
  };
  
  const handleMouseUp = () => {
    if (!isSwiping) return;
    
    if (swipeDistance < -SWIPE_THRESHOLD) {
      setIsDismissing(true);
      updateReadNotification.mutate(notificationId, {
        onSuccess: () => {
          setTimeout(() => {
            onRemoveNotification(notificationId);
          }, 300);
        }
      });
    } else {
      setSwipeDistance(0);
    }
    
    setIsSwiping(false);
    
    // Remove document-level handlers
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    if (swipeDistance < -SWIPE_THRESHOLD) {
      setIsDismissing(true);
      updateReadNotification.mutate(notificationId, {
        onSuccess: () => {
          setTimeout(() => {
            onRemoveNotification(notificationId);
          }, 300);
        }
      });
    } else {
      // Reset position
      setSwipeDistance(0);
    }
    
    setIsSwiping(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setShowExpandButton(
        ref.current.scrollHeight !== ref.current.clientHeight,
      );
    }
  }, [expandedNotificationId]);

  return (
    <div 
      ref={wrapperRef}
      className={clsx(c.swipeContainer)}
    >
      <div className={c.deleteAction}>Delete</div>
      <div 
        className={clsx(c.notificationWrapper, { [c.dismissing]: isDismissing })}
        style={{ transform: `translateX(${swipeDistance}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
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
        <p className={c.time}>
          {notification.activatedAt
            ? getPassedTime(new Date(notification.activatedAt))
            : 'Unknown time'}
        </p>
        {notificationsLength - 1 !== index && (
          <div className={c.dottedBreak}></div>
        )}
      </div>
    </div>
  );
};

export default Notification;