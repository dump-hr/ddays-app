import ScheduleCard from './compontents/ScheduleCard';
import { EventProps } from './compontents/ScheduleCard/ScheduleCard';
import ThumbnailTemp from './assets/images/thumbnailUrl-temp.png';
import ArasLogo from './assets/images/aras-logo-temp.svg';

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
};

function App() {
  return (
    <>
      <h1>App</h1>
      <ScheduleCard event={event as EventProps} isAddedToSchedule />
    </>
  );
}

export default App;
