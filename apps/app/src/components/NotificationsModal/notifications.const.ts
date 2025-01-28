type Notification = {
  id: number;
  title: string;
  content: string;
  time: Date;
};

export const notifications: Array<Notification> = [
  {
    id: 1,
    title: 'Notification 1',
    content:
      'This is the first notification and it is a very long notification that will be cut off after a few lines sdaasds dadsad asdasd asd das dasd asdasdas sadasdasd',
    time: new Date('2025-1-28-12:00'),
  },
  {
    id: 2,
    title: 'Notification 2',
    content: 'This is the second notification',
    time: new Date('2025-1-28-12:00'),
  },
  {
    id: 3,
    title: 'Notification 3',
    content: 'This is the third notification',
    time: new Date('2025-1-28-12:00'),
  },
  {
    id: 4,
    title: 'Notification 4',
    content: 'This is the fourth notification',
    time: new Date('2025-1-28-12:00'),
  },
  {
    id: 5,
    title: 'Notification 4',
    content: 'This is the fourth notification',
    time: new Date('2025-1-28-12:00'),
  },
];
