import vinyl from 'assets/images/black-vinyl-inline.png';
import duck from 'assets/images/full-duckie.webp';
import play from 'assets/images/play-arrow.svg';
import vinylCutout from 'assets/images/vinyl-cutout.png';
import clsx from 'clsx';

import classes from './DuckieSection.module.scss';

export const DuckieSection = () => (
  <div className={classes.container} id='konferencija'>
    <div className={clsx(classes.column, classes.duckie)}>
      <div className={classes.duckieArea}>
        <div className={classes.images}>
          <div className={classes.duckie}>
            <img src={duck} className={classes.duckImage} alt='duckie' />
          </div>
          <div className={classes.vinyl}>
            <div className={classes.vinylWrapper}>
              <div
                className={classes.ellipse}
                onClick={() =>
                  window.open(
                    'https://www.youtube.com/watch?v=SE8sij3schc',
                    '_blank',
                  )
                }>
                <img className={classes.play} src={play} alt='' />
              </div>
              <img className={classes.vinylImage} src={vinyl} alt='vinyl' />
              <img className={classes.cutout} src={vinylCutout} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.column}>
      <p className={classes.paragraph}>
        DUMP Udruga mladih programera u proteklih četrnaest godina svojim
        aktivnim predavanjima i radionicama sudjeluje u izgradnji i razvoju
        lokalne IT zajednice. Konferencija DUMP Days činila se kao korak
        naprijed kojim bismo produbili našu viziju povezivanja IT zajednice i na
        jednom mjestu okupili veći broj studenata i firmi.
      </p>
      <div className={classes.stats}>
        <div className={classes.stat}>
          <span className={classes.number}>12k+</span>
          <span className={classes.label}>posjetitelja</span>
        </div>
        <div className={classes.stat}>
          <span className={classes.number}>100</span>
          <span className={classes.label}>partnera</span>
        </div>
        <div className={classes.stat}>
          <span className={classes.number}>143</span>
          <span className={classes.label}>predavanja</span>
        </div>
      </div>
    </div>
  </div>
);
