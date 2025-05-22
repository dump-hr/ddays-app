import { Outlet, useLocation } from 'react-router-dom';
import { MobileNavigation } from '@/components/MobileNavigation';
import styles from './NavigationLayout.module.scss';
import DesktopNavigation from '@/components/DesktopNavigation';
import { useDeviceType } from '@/hooks/UseDeviceType';
import { navbarRoutes } from '@/router/routes';
import { UserProvider } from '@/context/UserContext';

export const NavigationLayout = () => {
  const { isMobile } = useDeviceType({ breakpoint: 769 });
  const location = useLocation();

  const shouldShowNavbar = navbarRoutes.some(
    (route) => route === location.pathname || route + '/' === location.pathname,
  );

  return (
    <div className={styles.container}>
      {shouldShowNavbar && <DesktopNavigation />}
      <UserProvider>
        <Outlet />
      </UserProvider>
      {isMobile && <MobileNavigation />}
    </div>
  );
};
