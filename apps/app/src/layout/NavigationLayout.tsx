import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import styles from './NavigationLayout.module.scss';
import { UserProvider } from '@/context/UserContext';

export const NavigationLayout = () => {

  return (
    <div className={styles.container}>
      <UserProvider>
        <Outlet />
        <Navigation />
      </UserProvider>
    </div>
  );
};
