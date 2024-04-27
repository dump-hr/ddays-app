import { CompanyCategory, CompanyPublicDto } from '@ddays-app/types';
import bronzeSponsor from 'assets/images/bronze-sponsor.png';
import goldSponsor from 'assets/images/golden-sponsor.png';
import kodak from 'assets/images/kodak.png';
import placeholder from 'assets/images/placeholder.svg';
import sectionBreakerEnd from 'assets/images/section-breaker-end.svg';
import sectionBreakerStart from 'assets/images/section-breaker-start.svg';
import silverSponsor from 'assets/images/silver-sponsor.png';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';

import { useGetAllSponsors } from '../../api/sponsor/useGetAllSponsors';
import { dotMaker } from '../../helpers/dotMaker';
import { useScreenSize } from '../../hooks/useScreenSize';
import classes from './SponsorSection.module.scss';

export const SponsorSection: React.FC = () => {
  const { data } = useGetAllSponsors();
  const [goldSponsors, setGoldSponsors] = useState<CompanyPublicDto[]>([]);
  const [silverSponsors, setSilverSponsors] = useState<CompanyPublicDto[]>([]);
  const [bronzeSponsors, setBronzeSponsors] = useState<CompanyPublicDto[]>([]);
  const [mediaSponsors, setMediaSponsors] = useState<CompanyPublicDto[]>([]);
  const [friendSponsors, setFriendSponsors] = useState<CompanyPublicDto[]>([]);

  useEffect(() => {
    if (data) {
      setGoldSponsors(data.filter((x) => x.category === CompanyCategory.Gold));
      setSilverSponsors(
        data.filter((x) => x.category === CompanyCategory.Silver),
      );
      setBronzeSponsors(
        data.filter((x) => x.category === CompanyCategory.Bronze),
      );
      setMediaSponsors(
        data.filter((x) => x.category === CompanyCategory.Media),
      );
      setFriendSponsors(
        data.filter((x) => x.category === CompanyCategory.Friend),
      );
    }
  }, [data]);

  const { isMobile } = useScreenSize(768);
  const maxSponsors = useMemo(() => (isMobile ? 2 : 4), [isMobile]);

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
          {goldSponsors.map((x) => (
            <article className={classes.sponsor}>
              <figure className={classes.picture}>
                <img
                  className={classes.landing}
                  src={x.landingImage}
                  alt={x.name}
                />
                <img className={classes.kodak} src={kodak} alt={x.name} />
              </figure>
              <span className={classes.name}>{x.name}</span>
              <div className={classes.dots}>{dotMaker()}</div>
              <div className={classes.openPositions}>
                <span className={classes.label}>Otvorene pozicije</span>
                <div className={classes.ellipse}>
                  <span className={classes.number}>
                    {
                      0 //TODO: Tehnically, this number should be the nu,ber of avialable positions, which would force making a new call or modifying every all sponsors call, I can add this but should probably discuss it first
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
        <div className={classes.logosWrapper}>
          <section className={classes.logos}>
            {silverSponsors.map((x, index) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                {(silverSponsors.length % maxSponsors
                  ? index <
                    silverSponsors.length -
                      (silverSponsors.length % maxSponsors)
                  : index < silverSponsors.length - maxSponsors) && (
                  <div className={classes.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={classes.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <article className={classes.sponsorSection}>
        <img src={bronzeSponsor} alt='brončani sponzori' />
        <span className={classes.sponsorTier}>Brončani sponzori</span>
        <div className={classes.logosWrapper}>
          <section className={classes.logos}>
            {bronzeSponsors.map((x, index) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                {(bronzeSponsors.length % maxSponsors
                  ? index <
                    bronzeSponsors.length -
                      (bronzeSponsors.length % maxSponsors)
                  : index < bronzeSponsors.length - maxSponsors) && (
                  <div className={classes.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={classes.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <article className={classes.sponsorSection}>
        <span className={classes.sponsorTier}>Medijski pokrovitelji</span>
        <div className={classes.logosWrapper}>
          <section className={classes.logos}>
            {mediaSponsors.map((x, index) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                {(mediaSponsors.length % maxSponsors
                  ? index <
                    mediaSponsors.length - (mediaSponsors.length % maxSponsors)
                  : index < mediaSponsors.length - maxSponsors) && (
                  <div className={classes.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={classes.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <article className={classes.sponsorSection}>
        <span className={classes.sponsorTier}>
          Organizacijski partneri & prijatelji
        </span>
        <div className={classes.logosWrapper}>
          <section className={classes.logos}>
            {friendSponsors.map((x, index) => (
              <figure className={classes.logo}>
                <img src={x.logoImage} alt={x.name} />
                {(friendSponsors.length % maxSponsors
                  ? index <
                    friendSponsors.length -
                      (friendSponsors.length % maxSponsors)
                  : index < friendSponsors.length - maxSponsors) && (
                  <div className={classes.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={classes.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <div className={classes.sectionBreakerEnd}>
        <img src={sectionBreakerEnd} alt='kraj sponzor sekcije' />
      </div>
    </section>
  );
};

//TODO: the upper section has to be scroll controlled along with some other pretty complex stuff, so in my opinion it is not critical to do that now and we shoul focus on making it dynamic later
//TODO: All images in the upper sponsor section are placeholders since we do not have access to all the logos we need right now
