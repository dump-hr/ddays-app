import { CompanyCategory } from '@ddays-app/types';
import bronzeSponsor from 'assets/images/bronze-sponsor.png';
import goldSponsor from 'assets/images/golden-sponsor.png';
import placeholder from 'assets/images/placeholder.svg';
import sectionBreakerEnd from 'assets/images/section-breaker-end.svg';
import sectionBreakerStart from 'assets/images/section-breaker-start.svg';
import silverSponsor from 'assets/images/silver-sponsor.png';
import clsx from 'clsx';

import { useGetAllSponsors } from '../../api/sponsor/useGetAllSponsors';
import { dotMaker } from '../../helpers/dotMaker';
import classes from './SponsorSection.module.scss';

export const SponsorSection: React.FC = () => {
  const { data } = useGetAllSponsors();

  return (
    <section className={classes.container}>
      <figure className={classes.topSection}>
        <div className={classes.sectionBreaker}>
          <img src={sectionBreakerStart} alt='početak sponzor sekcije' />
        </div>
        <span className={classes.idea}>Vjerujemo u jaka prijateljstva.</span>
        <span className={classes.title}>
          Motivirani uspjesima na IT sceni, zajedno oblikujemo budućnost
          digitalne generacije.
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
          {data
            ?.filter((x) => x.category === CompanyCategory.Gold)
            .map((x) => (
              <article className={classes.sponsor}>
                <img src={x.logoImage} alt={x.name} />
                <span className={classes.name}>{x.name}</span>
                <div className={classes.dots}>
                  {dotMaker().map((dot) => dot)}
                </div>
                <div className={classes.openPositions}>
                  <span className={classes.label}>Otvorene pozicije</span>
                  <div className={classes.ellipse}>
                    <span className={classes.number}>
                      {
                        x.interests?.length //TODO: Tehnically, this number should be the nu,ber of avialable positions, which would force making a new call or modifying every all sponsors call, I can add this but should probably discuss it first
                      }
                    </span>
                  </div>
                </div>
              </article>
            ))}
        </section>
      </article>
      <article className={classes.sponsorSection}>
        <img src={silverSponsor} alt='srebrni sponzori' />
        <span className={classes.sponsorTier}>Srebrni sponzori</span>
        <section className={classes.logos}>
          {data
            ?.filter((x) => x.category === CompanyCategory.Silver)
            .map((x) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                <div className={classes.horizontalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
                <div className={classes.verticalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
              </figure>
            ))}
        </section>
      </article>
      <article className={classes.sponsorSection}>
        <img src={bronzeSponsor} alt='brončani sponzori' />
        <span className={classes.sponsorTier}>Brončani sponzori</span>
        <section className={classes.logos}>
          {data
            ?.filter((x) => x.category === CompanyCategory.Bronze)
            .map((x) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                <div className={classes.horizontalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
                <div className={classes.verticalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
              </figure>
            ))}
        </section>
      </article>
      <article className={classes.sponsorSection}>
        <span className={classes.sponsorTier}>Medijski pokrovitelji</span>
        <section className={classes.logos}>
          {data
            ?.filter((x) => x.category === CompanyCategory.Media)
            .map((x) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                <div className={classes.horizontalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
                <div className={classes.verticalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
              </figure>
            ))}
        </section>
      </article>
      <article className={classes.sponsorSection}>
        <span className={classes.sponsorTier}>
          Organizacijski partneri & prijatelji
        </span>
        <section className={classes.logos}>
          {data
            ?.filter((x) => x.category === CompanyCategory.Friend)
            .map((x) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                <div className={classes.horizontalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
                <div className={classes.verticalDots}>
                  {dotMaker().map((dot) => dot)}
                </div>
              </figure>
            ))}
        </section>
      </article>
      <div className={classes.sectionBreakerEnd}>
        <img src={sectionBreakerEnd} alt='kraj sponzor sekcije' />
      </div>
    </section>
  );
};

//TODO: the upper section has to be scroll controlled along with some other pretty complex stuff, so in my opinion it is not critical to do that now and we shoul focus on making it dynamic later
//TODO: All images in the upper sponsor section are placeholders since we do not have access to all the logos we need right now
