import DuckieSection from 'components/DuckieSection';

import Schedule from '../../components/Schedule';
import classes from './LandingPage.module.scss';

export const LandingPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <Schedule />
      <DuckieSection />
    </div>
  );
};
