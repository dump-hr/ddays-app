import { NotificationDto } from '@ddays-app/types';

export const notifications: Array<NotificationDto> = [
  {
    id: 1,
    title: 'Notification 1',
    content:
      'This is the first notification and it is a very long notification that will be cut dfdsf sdfffsd fdf dffdsfdf dsfsdf off after a few lines sdaasds dadsad asdasd asd das dasd asdasdas sadasdasd',
    activatedAt: new Date('2025-2-17-18:00'),
    isActive: true,
  },
  {
    id: 2,
    title: 'Notification 2',
    content: 'This is the second notification',
    activatedAt: new Date('2025-2-17-20:00'),
    isActive: true,
  },
  {
    id: 3,
    title: 'Notification 3',
    content: 'This is the third notification',
    activatedAt: new Date('2025-2-17-19:00'),
    isActive: true,
  },
  {
    id: 4,
    title: 'Notification 4',
    content: 'This is the fourth notification',
    activatedAt: new Date('2025-2-17-16:00'),
    isActive: false,
  },
  {
    id: 5,
    title: 'Notification 4',
    content: 'This is the fourth notification',
    activatedAt: new Date('2025-2-17-17:00'),
    isActive: false,
  },
  {
    id: 6,
    title: 'Notification 2',
    content: 'This is the second notification',
    activatedAt: new Date('2025-2-17-20:00'),
    isActive: true,
  },
  {
    id: 7,
    title: 'Notification 3',
    content: 'This is the third notification',
    activatedAt: new Date('2025-2-17-19:00'),
    isActive: true,
  },
  {
    id: 8,
    title: 'Notification 4',
    content: 'This is the fourth notification',
    activatedAt: new Date('2025-2-17-16:00'),
    isActive: false,
  },
  {
    id: 9,
    title: 'Notification 4',
    content: 'This is the fourth notification',
    activatedAt: new Date('2025-2-17-17:00'),
    isActive: false,
  },
];
