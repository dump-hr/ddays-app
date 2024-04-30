import { CompanyCategory, CompanyPublicDto } from '@ddays-app/types';
import bronzeSponsor from 'assets/images/bronze-sponsor.png';
import goldSponsor from 'assets/images/golden-sponsor.png';
import kodak from 'assets/images/kodak.png';
import placeholder from 'assets/images/placeholder.svg';
import silverSponsor from 'assets/images/silver-sponsor.png';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';

import { useGetAllSponsors } from '../../api/sponsor/useGetAllSponsors';
import { dotMaker } from '../../helpers/dotMaker';
import { useScreenSize } from '../../hooks/useScreenSize';
import c from './SponsorSection.module.scss';

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
    <section className={c.container} id='sponzori'>
      <figure className={c.topSection}>
        <span className={c.idea}>Vjerujemo u jaka prijateljstva.</span>
        <span className={c.title}>
          Motivirani uspjesima na IT sceni, zajedno oblikujemo budućnost
          digitalne generacije.
        </span>
        <img
          className={clsx(c.image, c.first)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.second)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.third)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.fourth)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.fifth)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.sixth)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.seventh)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.eighth)}
          src={placeholder}
          alt='agilno-placeholder'
        />
        <img
          className={clsx(c.image, c.ninth)}
          src={placeholder}
          alt='agilno-placeholder'
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
                  src={sponsor.landingImage}
                  alt={sponsor.name}
                />
                <img className={c.kodak} src={kodak} alt={sponsor.name} />
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
