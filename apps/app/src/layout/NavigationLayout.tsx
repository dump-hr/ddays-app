import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import styles from './NavigationLayout.module.scss';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { UserProvider } from '@/context/UserContext';

export const NavigationLayout = () => {
  useAuthGuard();

  return (
    <div className={styles.container}>
      <UserProvider>
        <Outlet />
        <Navigation />
      </UserProvider>
    </div>
  );
};
