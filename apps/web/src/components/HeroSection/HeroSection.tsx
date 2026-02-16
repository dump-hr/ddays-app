import duck from 'assets/images/full-duckie.webp';

import c from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <section className={c.heroSection}>
      <div className={c.videoHero}>
        <div className={c.overlay} />
        <div className={c.heroContent}>
          <span className={c.subtitle}>// DUMP DAYS X</span>
          <h1 className={c.title}>
            <span className={c.titleLine}>KONFERENCIJA</span>
            <span className={c.titleLine}>
              ZA{' '}
              <span className={c.slavicaInline}>
                <span className={c.redStrip} />
                <img src={duck} alt='' className={c.slavicaDuck} />
              </span>{' '}
              NOVU
            </span>
            <span className={c.titleLine}>GENERACIJU</span>
            <span className={c.titleLine}>DIGITALA_</span>
          </h1>
          <span className={c.dateLocation}>28. — 29. 05. // SPLIT, FESB</span>
        </div>
      </div>

      <div className={c.rippedEdge}>
        <div className={c.rippedFg} />
      </div>
    </section>
  );
};
