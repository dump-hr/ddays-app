import bronzeSponsor from 'assets/images/bronze-sponsor.svg';
import goldSponsor from 'assets/images/gold-sponsor.svg';
import goldenPlacehoder from 'assets/images/golden-placeholder.svg';
import placeholder from 'assets/images/placeholder.svg';
import silverSponsor from 'assets/images/silver-sponsor.svg';
import clsx from 'clsx';

import classes from './SponsorSection.module.css';

export const SponsorSection: React.FC = () => (
  <section className={classes.container}>
    <figure className={classes.topSection}>
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
    </figure>
    <article className={classes.sponsorSection}>
      <img src={goldSponsor} alt='zlatni sponzori' />
      <span className={classes.sponsorTier}>Zlatni sponzori</span>
      <section className={classes.goldenRow}>
        <figure className={classes.image}>
          <img src={goldenPlacehoder} alt='zlatni sponzor' />
          <div className={classes.openPositions}>
            <span className={classes.label}>Open positions</span>
            <span className={classes.number}>9</span>
          </div>
        </figure>
      </section>
    </article>
    <article className={classes.sponsorSection}>
      <img src={silverSponsor} alt='srebrni sponzori' />
      <span className={classes.sponsorTier}>Srebrni sponzori</span>
      <section className={classes.logos}>
        <figure className={classes.logo}>
          <img src={placeholder} alt='agilno' />
        </figure>
      </section>
    </article>
    <article className={classes.sponsorSection}>
      <img src={bronzeSponsor} alt='brončani sponzori' />
      <span className={classes.sponsorTier}>Brončani sponzori</span>
      <section className={classes.logos}>
        <figure className={classes.logo}>
          <img src={placeholder} alt='agilno' />
        </figure>
      </section>
    </article>
    <article className={classes.sponsorSection}>
      <span className={classes.sponsorTier}>Medijski pokrovitelji</span>
      <section className={classes.logos}>
        <figure className={classes.logo}>
          <img src={placeholder} alt='agilno' />
        </figure>
      </section>
    </article>
    <article className={classes.sponsorSection}>
      <span className={classes.sponsorTier}>
        Organizacijski partneri & prijatelji
      </span>
      <section className={classes.logos}>
        <figure className={classes.logo}>
          <img src={placeholder} alt='agilno' />
        </figure>
      </section>
    </article>
    <div className={classes.sectionBreaker}></div>
  </section>
);

//TODO: the upper section has to be scroll controlled along with some other pretty complex stuff, so in my opinion it is not critical to do that now and we shoul focus on making it dynamic later
//TODO: All images in the upper sponsor section are placeholders since we do not have access to all the logos we need right now
