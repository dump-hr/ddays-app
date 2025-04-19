import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import styles from './NavigationLayout.module.scss';
import Navbar from '@/components/Navbar';
import { useDeviceType } from '@/hooks/UseDeviceType';
import { navbarRoutes } from '@/router/routes';
import { UserProvider } from '@/context/UserContext';

export const NavigationLayout = () => {
  const { isMobile } = useDeviceType({ breakpoint: 769 });
  const location = useLocation();

  const shouldShowNavbar = navbarRoutes.some(
    (route) => route === location.pathname,
  );

  return (
    <div className={styles.container}>
      {!isMobile && shouldShowNavbar && <Navbar />}
      <UserProvider>
        <Outlet />
      </UserProvider>
      {isMobile && <Navigation />}
    </div>
  );
};