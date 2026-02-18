import { CompanyCategory } from '@ddays-app/types';
import bronzeSponsor from 'assets/images/bronze-sponsor.webp';
import goldSponsor from 'assets/images/golden-sponsor.webp';
import silverSponsor from 'assets/images/silver-sponsor.webp';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useMemo } from 'react';

import { useGetAllSponsors } from '../../api/sponsor/useGetAllSponsors';
import { useScreenSize } from '../../hooks/useScreenSize';
import c from './SponsorSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const SponsorSection: React.FC = () => {
  const { data } = useGetAllSponsors();
  const sponsors = (data || []).filter((sponsor) => sponsor.logoImage);

  const goldSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.GOLD,
  );
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.SILVER,
  );
  const bronzeSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.BRONZE,
  );
  const mediaSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.MEDIA,
  );
  const friendSponsors = sponsors.filter(
    (sponsor) => sponsor.category === CompanyCategory.FRIEND,
  );

  const { isMobile } = useScreenSize(768);
  const maxSponsors = useMemo(() => (isMobile ? 2 : 4), [isMobile]);

  useEffect(() => {
    const images = document.querySelectorAll(`.${c.topSection} img`);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${c.topSection}`,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      repeat: -1,
      repeatDelay: 0.5,
    });

    tl.fromTo(
      images,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 3.5,
        stagger: {
          each: 0.5,
          from: 'random',
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        },
      },
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={c.container} id='sponzori'>
      <div className={c.stickySection}>
        <div className={c.quote}>
          <span className={c.idea}>Vjerujemo u jaka prijateljstva.</span>
          <span className={c.title}>
            Motivirani uspjesima na IT sceni, zajedno oblikujemo budućnost
            digitalne generacije.
          </span>
        </div>

        <figure className={c.topSection}>
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
            src='https://ddays-app-uploads.dump.hr/company-logo/jqOWtC7RxwzVIVL7KpWR4.svg'
            alt=''
          />
          <img
            className={clsx(c.image, c.fifth)}
            src='https://ddays-app-uploads.dump.hr/company-logo/AKXx3q-EiwTyKY20rpTOR.svg'
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
      </div>
      <article className={c.sponsorSection}>
        <img src={goldSponsor} alt='zlatni sponzori' />
        <span className={c.sponsorTier}>Zlatni sponzori</span>
        <div className={c.logosWrapper}>
          <section className={c.logos}>
            {goldSponsors.map((sponsor, index) => (
              <figure className={c.logo} key={sponsor.id}>
                <a target='_blank' href={sponsor.websiteUrl}>
                  <img src={sponsor.logoImage} alt={sponsor.name} />
                </a>
                {(goldSponsors.length % maxSponsors
                  ? index <
                    goldSponsors.length - (goldSponsors.length % maxSponsors)
                  : index < goldSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}></div>
                )}
                <div className={c.verticalDots}></div>
              </figure>
            ))}
          </section>
        </div>
      </article>
      <article className={c.sponsorSection}>
        <img src={silverSponsor} alt='srebrni sponzori' />
        <span className={c.sponsorTier}>Srebrni sponzori</span>
        <div className={c.logosWrapper}>
          <section className={c.logos}>
            {silverSponsors.map((sponsor, index) => (
              <figure className={c.logo} key={sponsor.id}>
                <a target='_blank' href={sponsor.websiteUrl}>
                  <img src={sponsor.logoImage} alt={sponsor.name} />
                </a>
                {(silverSponsors.length % maxSponsors
                  ? index <
                    silverSponsors.length -
                      (silverSponsors.length % maxSponsors)
                  : index < silverSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}></div>
                )}
                <div className={c.verticalDots}></div>
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
              <figure className={c.logo} key={sponsor.id}>
                <a target='_blank' href={sponsor.websiteUrl}>
                  <img src={sponsor.logoImage} alt={sponsor.name} />
                </a>
                {(bronzeSponsors.length % maxSponsors
                  ? index <
                    bronzeSponsors.length -
                      (bronzeSponsors.length % maxSponsors)
                  : index < bronzeSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}></div>
                )}
                <div className={c.verticalDots}></div>
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
              <figure className={c.logo} key={sponsor.id}>
                <a target='_blank' href={sponsor.websiteUrl}>
                  <img src={sponsor.logoImage} alt={sponsor.name} />
                </a>
                {(mediaSponsors.length % maxSponsors
                  ? index <
                    mediaSponsors.length - (mediaSponsors.length % maxSponsors)
                  : index < mediaSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}></div>
                )}
                <div className={c.verticalDots}></div>
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
              <figure className={c.logo} key={sponsor.id}>
                <a target='_blank' href={sponsor.websiteUrl}>
                  <img src={sponsor.logoImage} alt={sponsor.name} />
                </a>
                {(friendSponsors.length % maxSponsors
                  ? index <
                    friendSponsors.length -
                      (friendSponsors.length % maxSponsors)
                  : index < friendSponsors.length - maxSponsors) && (
                  <div className={c.horizontalDots}></div>
                )}
                <div className={c.verticalDots}></div>
              </figure>
            ))}
          </section>
        </div>
      </article>
    </section>
  );
};
