import vinyl from 'assets/images/cd.png';
import duck from 'assets/images/duckie.png';
import duckEffect from 'assets/images/duckie-mask.png';

import classes from './DuckieSection.module.scss';

export const DuckieSection = () => (
  <div className={classes.container}>
    <div className={classes.column}>
      <div className={classes.areas}>DEV, DESIGN &TECH KONFa</div>
      <div className={classes.duckieArea}>
        <div className={classes.images}>
          <div className={classes.duckie}>
            <img src={} alt='' />
          </div>
        </div>
      </div>
    </div>
  </div>
);
