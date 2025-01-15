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
  company: string;
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
  // Lecture Events
  {
    name: 'Mastering React',
    description: 'An advanced dive into React concepts.',
    type: 'lecture',
    theme: 'dev',
    startsAt: '2025-01-15T08:00:00Z',
    endsAt: '2025-01-15T23:00:00Z',
    requirements: ['Basic React knowledge'],
    speakers: [
      {
        firstName: 'John',
        lastName: 'Doe',
        title: 'Senior Developer',
        logoImage: 'react-logo.png',
        thumbnailUrl: 'john-doe.png',
        company: 'Tech Co.',
      },
    ],
  },
  {
    name: 'Mastering React',
    description: 'An advanced dive into React concepts.',
    type: 'lecture',
    theme: 'dev',
    startsAt: '2025-01-15T18:00:00Z',
    endsAt: '2025-01-16T23:20:00Z',
    requirements: ['Basic React knowledge'],
    speakers: [
      {
        firstName: 'John',
        lastName: 'Doe',
        title: 'Senior Developer',
        logoImage: 'react-logo.png',
        thumbnailUrl: 'john-doe.png',
        company: 'Tech Co.',
      },
    ],
  },
  {
    name: 'Intro to TypeScript',
    description: 'Learn the basics of TypeScript.',
    type: 'lecture',
    theme: 'dev',
    startsAt: '2025-01-15T20:20:00Z',
    endsAt: '2025-01-15T22:22:00Z',
    requirements: ['JavaScript knowledge'],
    speakers: [
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        title: 'TypeScript Advocate',
        logoImage: 'typescript-logo.png',
        thumbnailUrl: 'alice-johnson.png',
        company: 'Tech Co.',
      },
    ],
  },

  // Workshop Events
  {
    name: 'Designing for Accessibility',
    description: 'A practical workshop on accessible design.',
    type: 'workshop',
    theme: 'design',
    startsAt: '2025-01-15T08:00:00Z',
    endsAt: '2025-01-15T23:00:00Z',
    requirements: ['Interest in accessibility'],
    speakers: [
      {
        firstName: 'Laura',
        lastName: 'Smith',
        title: 'Accessibility Expert',
        logoImage: 'accessibility-logo.png',
        thumbnailUrl: 'laura-smith.png',
        company: 'Tech Co.',
      },
    ],
  },
  {
    name: 'Designing for Accessibility',
    description: 'A practical workshop on accessible design.',
    type: 'workshop',
    theme: 'design',
    startsAt: '2025-01-15T20:05:00Z',
    endsAt: '2025-01-15T21:00:00Z',
    requirements: ['Interest in accessibility'],
    speakers: [
      {
        firstName: 'Laura',
        lastName: 'Smith',
        title: 'Accessibility Expert',
        logoImage: 'accessibility-logo.png',
        thumbnailUrl: 'laura-smith.png',
        company: 'Tech Co.',
      },
    ],
  },
  {
    name: 'Advanced Prototyping with Figma',
    description: 'Learn advanced prototyping techniques in Figma.',
    type: 'workshop',
    theme: 'design',
    startsAt: '2025-01-19T14:00:00Z',
    endsAt: '2025-01-19T16:00:00Z',
    requirements: ['Basic knowledge of Figma'],
    speakers: [
      {
        firstName: 'Evan',
        lastName: 'Taylor',
        title: 'Product Designer',
        logoImage: 'figma-logo.png',
        thumbnailUrl: 'evan-taylor.png',
        company: 'Tech Co.',
      },
    ],
  },

  // Panel Events
  {
    name: 'Future of AI',
    description: 'Panel discussion on the future of artificial intelligence.',
    type: 'panel',
    theme: 'tech',
    startsAt: '2025-01-15T08:00:00Z',
    endsAt: '2025-01-15T20:00:00Z',
    requirements: ['Interest in AI'],
    speakers: [
      {
        firstName: 'Emily',
        lastName: 'Davis',
        title: 'AI Researcher',
        logoImage: 'ai-logo.png',
        thumbnailUrl: 'emily-davis.png',
        company: 'Tech Co.',
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        title: 'Tech Innovator',
        logoImage: 'innovator-logo.png',
        thumbnailUrl: 'michael-brown.png',
        company: 'Tech Co.',
      },
    ],
    moderator: {
      firstName: 'Sophia',
      lastName: 'Williams',
      title: 'Tech Journalist',
      logoImage: 'journalist-logo.png',
      thumbnailUrl: 'sophia-williams.png',
      company: 'Tech Co.',
    },
  },
  {
    name: 'Future of AI',
    description: 'Panel discussion on the future of artificial intelligence.',
    type: 'panel',
    theme: 'tech',
    startsAt: '2025-01-18T10:00:00Z',
    endsAt: '2025-01-18T12:00:00Z',
    requirements: ['Interest in AI'],
    speakers: [
      {
        firstName: 'Emily',
        lastName: 'Davis',
        title: 'AI Researcher',
        logoImage: 'ai-logo.png',
        thumbnailUrl: 'emily-davis.png',
        company: 'Tech Co.',
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        title: 'Tech Innovator',
        logoImage: 'innovator-logo.png',
        thumbnailUrl: 'michael-brown.png',
        company: 'Tech Co.',
      },
    ],
    moderator: {
      firstName: 'Sophia',
      lastName: 'Williams',
      title: 'Tech Journalist',
      logoImage: 'journalist-logo.png',
      thumbnailUrl: 'sophia-williams.png',
      company: 'Tech Co.',
    },
  },

  // Campfire Talk Events
  {
    name: 'Storytelling in Marketing',
    description: 'Learn how to captivate your audience with storytelling.',
    type: 'campfireTalk',
    theme: 'marketing',
    startsAt: '2025-01-15T08:00:00Z',
    endsAt: '2025-01-15T20:30:00Z',
    speakers: [
      {
        firstName: 'Chris',
        lastName: 'Adams',
        title: 'Marketing Strategist',
        logoImage: 'storytelling-logo.png',
        thumbnailUrl: 'chris-adams.png',
        company: 'Tech Co.',
      },
    ],
  },
  {
    name: 'Storytelling in Marketing',
    description: 'Learn how to captivate your audience with storytelling.',
    type: 'campfireTalk',
    theme: 'marketing',
    startsAt: '2025-01-21T18:00:00Z',
    endsAt: '2025-01-21T19:30:00Z',
    speakers: [
      {
        firstName: 'Chris',
        lastName: 'Adams',
        title: 'Marketing Strategist',
        logoImage: 'storytelling-logo.png',
        thumbnailUrl: 'chris-adams.png',
        company: 'Tech Co.',
      },
    ],
  },

  // Fly Talk Events
  {
    name: 'Lightning Talks: Future of Web Development',
    description: 'Short talks from experts on web development trends.',
    type: 'flyTalk',
    theme: 'dev',
    startsAt: '2025-01-22T09:00:00Z',
    endsAt: '2025-01-22T11:00:00Z',
    speakers: [
      {
        firstName: 'Alex',
        lastName: 'Turner',
        title: 'Frontend Developer',
        logoImage: 'web-logo.png',
        thumbnailUrl: 'alex-turner.png',
        company: 'Tech Co.',
      },
      {
        firstName: 'Jamie',
        lastName: 'Carter',
        title: 'Backend Engineer',
        logoImage: 'backend-logo.png',
        thumbnailUrl: 'jamie-carter.png',
        company: 'Tech Co.',
      },
    ],
  },

  // Other Events
  {
    name: 'Open Mic: Tech in 2025',
    description: 'An open discussion on the future of technology.',
    type: 'other',
    theme: 'tech',
    startsAt: '2025-01-23T15:00:00Z',
    endsAt: '2025-01-23T16:30:00Z',
    requirements: ['Interest in tech'],
    speakers: [
      {
        firstName: 'Taylor',
        lastName: 'Brooks',
        title: 'Tech Enthusiast',
        logoImage: 'openmic-logo.png',
        thumbnailUrl: 'taylor-brooks.png',
        company: 'Tech Co.',
      },
    ],
  },
];
