import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import styles from './NavigationLayout.module.scss';
import Navbar from '@/components/Navbar';
import { useDeviceType } from '@/hooks/UseDeviceType';

export const NavigationLayout = () => {
  const { isMobile } = useDeviceType({ breakpoint: 769 });
  return (
    <div className={styles.container}>
      {!isMobile && <Navbar />}
      <Outlet />
      {isMobile && <Navigation />}
    </div>
  );
};
