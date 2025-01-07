import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import styles from './Navigation.module.scss';

export const NavigationLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <Navigation />
    </div>
  );
};
