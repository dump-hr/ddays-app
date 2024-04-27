import { BoothDto } from '@ddays-app/types';

import BoothLocation from '../../components/BoothLocation';

const spots: BoothDto[] = [
  {
    id: 1,
    isTaken: false,
    name: 'A1',
  },
  {
    id: 2,
    isTaken: false,
    name: 'A2',
  },
  ...Array.from({ length: 20 }).map((_, index) => ({
    id: index + 3,
    isTaken: Math.random() < 0.5,
    name: `A${index + 3}`,
  })),
];

export const SpotsPage = () => {
  return <BoothLocation initSpots={spots} />;
};
