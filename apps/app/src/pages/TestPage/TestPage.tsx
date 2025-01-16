import ScheduleCard from '../../components/ScheduleCard';
import { EventProps } from '../../components/ScheduleCard/ScheduleCard';
import ThumbnailTemp from '../../assets/images/thumbnailUrl-temp.png';
import ArasLogo from '../../assets/images/aras-logo-temp.svg';
import { useState } from 'react';

const event = {
  name: 'Event Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc',
  type: 'lecture',
  theme: 'dev',
  startsAt: new Date().toISOString(),
  endsAt: new Date().toISOString(),
  requirements: ['laptop', 'pen', 'paper'],
  speakers: [
    {
      thumbnailUrl: ThumbnailTemp,
      firstName: 'John',
      lastName: 'Doe',
      title: 'Title',
      logoImage: ArasLogo,
    },
    {
      thumbnailUrl: ThumbnailTemp,
      firstName: 'John',
      lastName: 'Doe',
      title: 'Title',
      logoImage: ArasLogo,
    },
  ],
  moderator: {
    thumbnailUrl: ThumbnailTemp,
    firstName: 'John',
    lastName: 'Doe',
    title: 'Title',
    logoImage: ArasLogo,
  },
};

const TestPage = () => {
  const [isAddedToSchedule, setIsAddedToSchedule] = useState(false);
  return (
    <>
      <ScheduleCard
        event={event as EventProps}
        isAddedToSchedule={isAddedToSchedule}
        clickHandler={() => setIsAddedToSchedule((prev) => !prev)}
      />
    </>
  );
};

export default TestPage;
