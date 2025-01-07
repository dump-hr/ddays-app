import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import styles from './NavigationLayout.module.scss';

export const NavigationLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <Navigation />
    </div>
  );
};
