import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import styles from '../components/Navigation/Navigation.module.scss';

export const NavigationLayout = () => {
  return (
    <div className={styles.navigationLayout}>
      <Outlet />
      <Navigation />
    </div>
  );
};
