import ScheduleCard from '../../components/ScheduleCard';
import ThumbnailTemp from '../../assets/images/thumbnailUrl-temp.png';
import ArasLogo from '../../assets/images/aras-logo-temp.svg';
import { useState } from 'react';
import { EventWithSpeakerDto } from '@ddays-app/types';

const event = {
  id: 1,
  name: 'Tech Innovations Summit',
  description: 'A deep dive into the latest trends in technology.',
  startsAt: '2025-01-20T10:00:00Z',
  endsAt: '2025-01-20T14:00:00Z',
  maxParticipants: 300,
  requirements: 'Basic understanding of cloud computing.',
  footageLink: 'https://example.com/footage/tech-summit',
  type: 'panel',
  theme: 'tech',
  codeId: 123,
  speakers: [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      title: 'Software Engineer',
      companyId: 101,
      photo: {
        mainPhotoUrl: 'https://example.com/photos/jane-doe-main.jpg',
        thumbnailUrl: ThumbnailTemp,
      },
      instagram: 'https://instagram.com/janedoe',
      linkedin: 'https://linkedin.com/in/janedoe',
      description:
        'Jane is a seasoned software engineer with expertise in cloud computing and distributed systems.',
      company: {
        id: 101,
        category: 'gold',
        name: 'Tech Innovations',
        description: 'Leading the way in tech solutions.',
        opportunitiesDescription:
          'We are hiring for multiple roles in AI and cloud engineering.',
        website: 'https://techinnovations.com',
        instagram: 'https://instagram.com/techinnovations',
        linkedin: 'https://linkedin.com/company/techinnovations',
        booth: 'A1',
        logoImage: ArasLogo,
        landingImage: 'https://example.com/images/landing/tech-innovations.jpg',
        landingImageCompanyCulture:
          'https://example.com/images/culture/tech-innovations.jpg',
        bookOfStandards: 'https://example.com/docs/tech-standards.pdf',
        video: 'https://example.com/videos/intro.mp4',
        interests: [
          { id: 201, name: 'Cloud Computing', theme: 'tech' },
          { id: 202, name: 'AI Research', theme: 'tech' },
        ],
        jobs: [
          {
            id: 301,
            position: 'Cloud Engineer',
            location: 'Remote',
            details: 'Design and implement scalable cloud architectures.',
            link: 'https://example.com/jobs/cloud-engineer',
            createdAt: new Date(),
            companyId: 101,
          },
        ],
      },
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Smith',
      title: 'Creative Director',
      companyId: 102,
      photo: {
        mainPhotoUrl: 'https://example.com/photos/john-smith-main.jpg',
        thumbnailUrl: ThumbnailTemp,
      },
      instagram: 'https://instagram.com/johnsmith',
      linkedin: 'https://linkedin.com/in/johnsmith',
      description:
        'John has over 15 years of experience in creative design and branding for global campaigns.',
      company: {
        id: 102,
        category: 'silver',
        name: 'Creative Minds',
        description: 'Innovative design solutions for modern businesses.',
        opportunitiesDescription:
          'Join our team of passionate designers and strategists.',
        website: 'https://creativeminds.com',
        instagram: 'https://instagram.com/creativeminds',
        linkedin: 'https://linkedin.com/company/creativeminds',
        booth: 'B5',
        logoImage: ArasLogo,
        landingImage: 'https://example.com/images/landing/creative-minds.jpg',
        landingImageCompanyCulture:
          'https://example.com/images/culture/creative-minds.jpg',
        bookOfStandards: 'https://example.com/docs/design-standards.pdf',
        video: 'https://example.com/videos/intro.mp4',
        interests: [
          { id: 203, name: 'Graphic Design', theme: 'design' },
          { id: 204, name: 'Brand Strategy', theme: 'design' },
        ],
        jobs: [
          {
            id: 302,
            position: 'Brand Strategist',
            location: 'On-site',
            details:
              'Develop and implement brand strategies for Fortune 500 clients.',
            link: 'https://example.com/jobs/brand-strategist',
            createdAt: new Date(),
            companyId: 102,
          },
        ],
      },
    },
  ],
};

const TestPage = () => {
  const [isAddedToSchedule, setIsAddedToSchedule] = useState(false);
  return (
    <>
      <ScheduleCard
        event={event as EventWithSpeakerDto}
        isAddedToSchedule={isAddedToSchedule}
        clickHandler={() => setIsAddedToSchedule((prev) => !prev)}
      />
    </>
  );
};

export default TestPage;
