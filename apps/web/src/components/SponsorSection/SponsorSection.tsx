import { CompanyCategory } from '@ddays-app/types';
import bronzeSponsor from 'assets/images/bronze-sponsor.webp';
import goldSponsor from 'assets/images/golden-sponsor.webp';
import kodak from 'assets/images/kodak.webp';
import silverSponsor from 'assets/images/silver-sponsor.webp';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { useGetAllSponsors } from '../../api/sponsor/useGetAllSponsors';
import { dotMaker } from '../../helpers/dotMaker';
import { useScreenSize } from '../../hooks/useScreenSize';
import c from './SponsorSection.module.scss';

export const SponsorSection: React.FC = () => {
  const { data } = useGetAllSponsors();
  const sponsors = (data || []).filter((sponsor) => sponsor.logoImage);

  const goldSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.Gold,
  );
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.Silver,
  );
  const bronzeSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.Bronze,
  );
  const mediaSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.Media,
  );
  const friendSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.Friend,
  );

  const { isMobile } = useScreenSize(768);
  const maxSponsors = useMemo(() => (isMobile ? 2 : 4), [isMobile]);

  return (
    <section className={c.container} id='sponzori'>
      <figure className={c.topSection}>
        <span className={c.idea}>Vjerujemo u jaka prijateljstva.</span>
        <span className={c.title}>
          Motivirani uspjesima na IT sceni, zajedno oblikujemo budućnost
          digitalne generacije.
        </span>
        <img
          className={clsx(c.image, c.first)}
          src='https://ddays-app-uploads.dump.hr/company-logo/thp3VVg89Sj4tHNc_xtMl.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.second)}
          src='https://ddays-app-uploads.dump.hr/company-logo/0hfC4eKEqSKbXn_F22518.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.third)}
          src='https://ddays-app-uploads.dump.hr/company-logo/hc9GqEEhRtOJkk1igIkXw.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.fourth)}
          src='https://ddays-app-uploads.dump.hr/company-logo/_BPp8z1akpLYDKfGLshIK.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.fifth)}
          src='https://ddays-app-uploads.dump.hr/company-logo/o6A-Blvc31bctYHkLEg1A.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.sixth)}
          src='https://ddays-app-uploads.dump.hr/company-logo/68UleSMKyBSFOemgIS8Bx.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.seventh)}
          src='https://ddays-app-uploads.dump.hr/company-logo/q85WaNbdchDQyVolERFpg.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.eighth)}
          src='https://ddays-app-uploads.dump.hr/company-logo/YGzRtV8wGG4_0wCK-JHhG.svg'
          alt=''
        />
        <img
          className={clsx(c.image, c.ninth)}
          src='https://ddays-app-uploads.dump.hr/company-logo/rtbpH9-uMTVDYSjeMgEzJ.svg'
          alt=''
        />
        <div className={c.sectionBreaker}></div>
      </figure>
      <article className={c.sponsorSection}>
        <img src={goldSponsor} alt='zlatni sponzori' />
        <span className={c.sponsorTier}>Zlatni sponzori</span>
        <section className={c.goldenRow}>
          {goldSponsors.map((sponsor) => (
            <article className={c.sponsor} key={sponsor.id}>
              <figure className={c.picture}>
                <img
                  className={c.landing}
                  src={sponsor.landingImage?.replace(
                    /\.[^/.]+$/,
                    '_optimized.webp',
                  )}
                  alt={sponsor.name}
                />
                <img className={c.kodak} src={kodak} alt={sponsor.name} />
                <img
                  className={c.logo}
                  src={sponsor.logoImage}
                  alt={sponsor.name}
                />
              </figure>
              <span className={c.name}>{sponsor.name}</span>
              <div className={c.dots}>{dotMaker()}</div>
              <div className={c.openPositions}>
                <span className={c.label}>Otvorene pozicije</span>
                <div className={c.ellipse}>
                  <span className={c.number}>
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
      <article className={c.sponsorSection}>
        <img src={silverSponsor} alt='srebrni sponzori' />
        <span className={c.sponsorTier}>Srebrni sponzori</span>
        <div className={c.logosWrapper}>
          <section className={c.logos}>
            {silverSponsors.map((sponsor, index) => (
              <figure className={c.logo} key={sponsor.id}>
                <img src={sponsor.logoImage} alt={sponsor.name} />
                {(silverSponsors.length % maxSponsors
                  ? index <
                    silverSponsors.length -
                      (silverSponsors.length % maxSponsors)
                  : index < silverSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={c.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <article className={c.sponsorSection}>
        <img src={bronzeSponsor} alt='brončani sponzori' />
        <span className={c.sponsorTier}>Brončani sponzori</span>
        <div className={c.logosWrapper}>
          <section className={c.logos}>
            {bronzeSponsors.map((sponsor, index) => (
              <figure className={c.logo}>
                <img src={sponsor.logoImage} alt={sponsor.name} />
                {(bronzeSponsors.length % maxSponsors
                  ? index <
                    bronzeSponsors.length -
                      (bronzeSponsors.length % maxSponsors)
                  : index < bronzeSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={c.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <article className={c.sponsorSection}>
        <span className={c.sponsorTier}>Medijski pokrovitelji</span>
        <div className={c.logosWrapper}>
          <section className={c.logos}>
            {mediaSponsors.map((sponsor, index) => (
              <figure className={c.logo}>
                <img src={sponsor.logoImage} alt={sponsor.name} />
                {(mediaSponsors.length % maxSponsors
                  ? index <
                    mediaSponsors.length - (mediaSponsors.length % maxSponsors)
                  : index < mediaSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={c.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <article className={c.sponsorSection}>
        <span className={c.sponsorTier}>
          Organizacijski partneri & prijatelji
        </span>
        <div className={c.logosWrapper}>
          <section className={c.logos}>
            {friendSponsors.map((sponsor, index) => (
              <figure className={c.logo}>
                <img src={sponsor.logoImage} alt={sponsor.name} />
                {(friendSponsors.length % maxSponsors
                  ? index <
                    friendSponsors.length -
                      (friendSponsors.length % maxSponsors)
                  : index < friendSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}>{dotMaker()}</div>
                )}
                <div className={c.verticalDots}>{dotMaker()}</div>
              </figure>
            ))}
          </section>
        </div>
      </article>
    </section>
  );
};
