import duck from 'assets/images/full-duckie.png';
import play from 'assets/images/play.svg';
import vinyl from 'assets/images/vinyl.png';

import classes from './DuckieSection.module.scss';

export const DuckieSection = () => (
  <div className={classes.container}>
    <div className={classes.column}>
      <div className={classes.areas}>DEV, DESIGN &TECH KONFa</div>
      <div className={classes.duckieArea}>
        <div className={classes.images}>
          <div className={classes.duckie}>
            <img src={duck} className={classes.duckImage} alt='duckie' />
          </div>
          <div className={classes.vinyl}>
            <div className={classes.vinylWrapper}>
              <div className={classes.elipse}>
                <img className={classes.play} src={play} alt='' />
              </div>
              <img className={classes.vinylImage} src={vinyl} alt='vinyl' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={classes.column}>
      <div className={classes.paragraph}>
        DUMP Udruga mladih programera u proteklih četrnaest godina svojim
        aktivnim predavanjima i radionicama sudjeluje u izgradnji i razvoju
        lokalne IT zajednice. Konferencija DUMP Days činila se kao korak
        naprijed kojim bismo produbili našu viziju povezivanja IT zajednice i na
        jednom mjestu okupili veći broj studenata i firmi.
      </div>
      <div className={classes.stats}>
        <div className={classes.stat}>
          <span className={classes.number}>8272</span>
          <span className={classes.label}>posjetitelja</span>
        </div>
        <div className={classes.stat}>
          <span className={classes.number}>87</span>
          <span className={classes.label}>partnera</span>
        </div>
        <div className={classes.stat}>
          <span className={classes.number}>105</span>
          <span className={classes.label}>predavanja</span>
        </div>
      </div>
    </div>
  </div>
);
