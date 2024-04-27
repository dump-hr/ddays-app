import { BoothDto } from '@ddays-app/types';
import socketIO from 'socket.io-client';

import { useGetBooths } from '../../api/booth/useGetBooths';
import BoothLocation from '../../components/BoothLocation';

const socket = socketIO('http://localhost:3000');

export const SpotsPage = () => {
  const { data: booths } = useGetBooths();
  return <BoothLocation initSpots={booths} />;
};
