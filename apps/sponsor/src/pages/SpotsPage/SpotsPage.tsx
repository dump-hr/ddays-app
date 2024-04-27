import socketIO from 'socket.io-client';

import { useGetBooths } from '../../api/booth/useGetBooths';
import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { BoothConfirmationPage } from '../../components/BoothConfirmationPage/BoothConfirmationPage';
import BoothLocation from '../../components/BoothLocation';

const socket = socketIO('http://localhost:3005/socket');

export const SpotsPage = () => {
  const { data: booths, isLoading } = useGetBooths();
  const { data: user, isLoading: companyLoading } =
    useCompanyGetCurrentPublic();
  return !isLoading && !companyLoading && user?.boothLocation ? (
    <BoothConfirmationPage name={user.boothLocation} />
  ) : (
    <BoothLocation socket={socket} initSpots={booths} />
  );
};
