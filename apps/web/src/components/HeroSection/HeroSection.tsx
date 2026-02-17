import duckWithBg from 'assets/images/duck-with-orange-background.png';

import c from './HeroSection.module.scss';

export const HeroSection = () => {
  return (
    <section className={c.heroSection}>
      <div className={c.videoHero}>
        <div className={c.overlay} />
        <div className={c.heroContent}>
          <span className={c.subtitle}>// DUMP DAYS X</span>
          <span className={c.titleLine}>KONFERENCIJA</span>
          <span className={c.titleLine}>
            ZA{' '}
            <span className={c.slavicaInline}>
              <img src={duckWithBg} alt='' className={c.slavicaDuck} />
            </span>{' '}
            NOVU
          </span>
          <span className={c.titleLine}>GENERACIJU</span>
          <div className={c.lastRow}>
            <span className={c.dateLocation}>
              {'28. — 29. 05.\n// SPLIT, FESB'}
            </span>
            <span className={c.titleLine}>DIGITALA_</span>
          </div>
        </div>
      </div>

      <div className={c.rippedEdge}>
        <div className={c.rippedFg} />
      </div>
    </section>
  );
};
