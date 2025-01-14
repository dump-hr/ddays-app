/*
  type EventType =
  | 'lecture'
  | 'workshop'
  | 'flyTalk'
  | 'campfireTalk'
  | 'panel'
  | 'other';
type EventTheme = 'dev' | 'design' | 'marketing' | 'tech';

type Speaker = {
  firstName: string;
  lastName: string;
  title: string;
  logoImage: string;
  thumbnailUrl: string;
};

export type EventProps = {
  name: string;
  description?: string;
  type: EventType;
  theme: EventTheme;
  startsAt: string;
  endsAt: string;
  requirements?: string[];
  speakers: Speaker[];
  moderator?: Speaker;
};

type CompactScheduleCardProps = {
  event: EventProps;
};
  */

export const events = [
  {
    name: 'React Hooks',
    description: 'Learn how to use React Hooks',
    type: 'lecture',
    theme: 'dev',
    startsAt: '2025-01-14T09:00:00Z',
    endsAt: '2025-01-14T23:00:00Z',
    requirements: ['Basic React knowledge'],
    speakers: [
      {
        firstName: 'John',
        lastName: 'Doe',
        title: 'Senior Developer',
        logoImage: 'facebook-logo.png',
        thumbnailUrl: 'john-doe.png',
        company: 'Facebook',
      },
    ],
  },
  {
    name: 'UX Design Fundamentals',
    description: 'Explore the key principles of UX design.',
    type: 'workshop',
    theme: 'design',
    startsAt: '2025-01-14T09:00:00Z',
    endsAt: '2025-01-14T20:00:00Z',
    requirements: ['Interest in design'],
    speakers: [
      {
        firstName: 'Jane',
        lastName: 'Smith',
        title: 'UX Designer',
        logoImage: 'google-logo.png',
        thumbnailUrl: 'jane-smith.png',
        company: 'Facebook',
      },
    ],
  },
  {
    name: 'AI in Healthcare',
    description: 'Learn about the role of AI in modern healthcare.',
    type: 'panel',
    theme: 'tech',
    startsAt: '2025-01-14T11:00:00Z',
    endsAt: '2025-01-14T20:00:00Z',
    requirements: ['Interest in healthcare and AI'],
    speakers: [
      {
        firstName: 'Emily',
        lastName: 'Davis',
        title: 'AI Researcher',
        logoImage: 'mit-logo.png',
        thumbnailUrl: 'emily-davis.png',
        company: 'Facebook',
      },
      {
        firstName: 'Mark',
        lastName: 'Lee',
        title: 'Medical Technologist',
        logoImage: 'jh-logo.png',
        thumbnailUrl: 'mark-lee.png',
        company: 'Facebook',
      },
    ],
    moderator: {
      firstName: 'Anna',
      lastName: 'Taylor',
      title: 'Healthcare Advisor',
      logoImage: 'advisor-logo.png',
      thumbnailUrl: 'anna-taylor.png',
      company: 'Facebook',
    },
  },
  {
    name: 'Photography 101',
    description: 'Master the basics of digital photography.',
    type: 'workshop',
    theme: 'tech',
    startsAt: '2025-01-13T14:00:00Z',
    endsAt: '2025-01-13T20:00:00Z',
    requirements: ['Bring your own camera'],
    speakers: [
      {
        firstName: 'Alex',
        lastName: 'Turner',
        title: 'Professional Photographer',
        logoImage: 'camera-logo.png',
        thumbnailUrl: 'alex-turner.png',
        company: 'Facebook',
      },
    ],
  },
  {
    name: 'Blockchain Beyond Bitcoin',
    description: 'Discover the wide applications of blockchain technology.',
    type: 'lecture',
    theme: 'tech',
    startsAt: '2025-01-13T15:00:00Z',
    endsAt: '2025-01-13T20:00:00Z',
    requirements: ['Basic understanding of blockchain'],
    speakers: [
      {
        firstName: 'Michael',
        lastName: 'Brown',
        title: 'Blockchain Expert',
        logoImage: 'blockchain-logo.png',
        thumbnailUrl: 'michael-brown.png',
        company: 'Facebook',
      },
    ],
  },
  {
    name: 'Marketing in 2025',
    description: 'Explore the latest trends in marketing for the digital era.',
    type: 'campfireTalk',
    theme: 'marketing',
    startsAt: '2025-01-18T10:00:00Z',
    endsAt: '2025-01-18T12:00:00Z',
    speakers: [
      {
        firstName: 'Sophia',
        lastName: 'Williams',
        title: 'Digital Marketing Specialist',
        logoImage: 'marketing-logo.png',
        thumbnailUrl: 'sophia-williams.png',
        company: 'Facebook',
      },
    ],
  },
];
