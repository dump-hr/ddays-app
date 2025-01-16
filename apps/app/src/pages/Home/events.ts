import { EventWithSpeakerDto } from '@ddays-app/types';

export const events: EventWithSpeakerDto[] = [
  {
    id: 1,
    name: 'Mastering React',
    description: 'An advanced dive into React concepts.',
    startsAt: '2025-01-16T08:00:00Z',
    endsAt: '2025-01-16T23:00:00Z',
    maxParticipants: 100,
    requirements: 'Basic React knowledge',
    footageLink: undefined,
    type: 'lecture',
    theme: 'dev',
    codeId: undefined,
    speakers: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        title: 'Senior Developer',
        companyId: 1,
        photo: {
          mainPhotoUrl: 'https://example.com/images/react-logo.png',
          thumbnailUrl: 'https://example.com/images/john-doe-thumb.png',
        },
        instagram: 'https://instagram.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        description: 'Expert in React and frontend technologies.',
        company: {
          id: 1,
          category: 'gold',
          name: 'Tech Co.',
          description:
            'A leading tech company specializing in web development.',
          opportunitiesDescription: 'We offer great growth opportunities.',
          website: 'https://techco.com',
          instagram: 'https://instagram.com/techco',
          linkedin: 'https://linkedin.com/company/techco',
          booth: 'Booth A1',
          logoImage: 'https://example.com/images/techco-logo.png',
          landingImage: 'https://example.com/images/techco-landing.png',
          landingImageCompanyCulture:
            'https://example.com/images/techco-culture.png',
          bookOfStandards: 'https://example.com/docs/standards.pdf',
          video: 'https://youtube.com/techco',
          interests: [
            {
              id: 1,
              name: 'Frontend Development',
              theme: 'dev',
            },
          ],
          jobs: [
            {
              id: 1,
              position: 'Frontend Engineer',
              location: 'Remote',
              details: 'Build amazing React applications.',
              link: 'https://jobs.techco.com/frontend',
              createdAt: new Date('2025-01-01'),
              companyId: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: 1,
    name: 'Mastering React',
    description: 'An advanced dive into React concepts.',
    startsAt: '2025-01-16T08:00:00Z',
    endsAt: '2025-01-16T23:00:00Z',
    maxParticipants: 100,
    requirements: 'Basic React knowledge',
    footageLink: undefined,
    type: 'workshop',
    theme: 'dev',
    codeId: undefined,
    speakers: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        title: 'Senior Developer',
        companyId: 1,
        photo: {
          mainPhotoUrl: 'https://example.com/images/react-logo.png',
          thumbnailUrl: 'https://example.com/images/john-doe-thumb.png',
        },
        instagram: 'https://instagram.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        description: 'Expert in React and frontend technologies.',
        company: {
          id: 1,
          category: 'gold',
          name: 'Tech Co.',
          description:
            'A leading tech company specializing in web development.',
          opportunitiesDescription: 'We offer great growth opportunities.',
          website: 'https://techco.com',
          instagram: 'https://instagram.com/techco',
          linkedin: 'https://linkedin.com/company/techco',
          booth: 'Booth A1',
          logoImage: 'https://example.com/images/techco-logo.png',
          landingImage: 'https://example.com/images/techco-landing.png',
          landingImageCompanyCulture:
            'https://example.com/images/techco-culture.png',
          bookOfStandards: 'https://example.com/docs/standards.pdf',
          video: 'https://youtube.com/techco',
          interests: [
            {
              id: 1,
              name: 'Frontend Development',
              theme: 'dev',
            },
          ],
          jobs: [
            {
              id: 1,
              position: 'Frontend Engineer',
              location: 'Remote',
              details: 'Build amazing React applications.',
              link: 'https://jobs.techco.com/frontend',
              createdAt: new Date('2025-01-01'),
              companyId: 1,
            },
          ],
        },
      },
    ],
  },
];
