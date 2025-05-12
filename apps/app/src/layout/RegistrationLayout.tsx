import { RegistrationDataProvider } from '@/providers/RegistrationDataProvider';
import { Outlet } from 'react-router-dom';

export const RegistrationLayout = () => {
  return (
    <RegistrationDataProvider>
      <Outlet />
    </RegistrationDataProvider>
  );
};
