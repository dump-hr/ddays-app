import placeholder from 'assets/images/placeholder.png';
import clsx from 'clsx';

import classes from './SponsorSection.module.css';

export const SponsorSection: React.FC = () => (
  <div className={classes.container}>
    <div className={classes.topSection}>
      <div className={classes.sectionBreaker}></div>
      <span className={classes.idea}>Vjerujemo u jaka prijateljstva.</span>
      <span className={classes.title}>
        Motivirani uspjesima na IT sceni, zajedno oblikujemo budućnost digitalne
        generacije.
      </span>
      <img
        className={clsx(classes.image, classes.first)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.second)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.third)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.fourth)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.fifth)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.sixth)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.seventh)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.eighth)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <img
        className={clsx(classes.image, classes.ninth)}
        src={placeholder}
        alt='agilno-placeholder'
      />
      <div className={classes.sectionBreaker}></div>
    </div>
  </div>
);

//TODO: the upper section has to be scroll controlled along with some other pretty complex stuff, so in my opinion it is not critical to do that now and we shoul focus on making it dynamic later
//TODO: All images in the upper sponsor section are placeholders since we do not have access to all the logos we need right now
