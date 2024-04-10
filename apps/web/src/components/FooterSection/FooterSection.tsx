import clsx from 'clsx';

import DaysSticker from '../../assets/images/days-sticker.png';
import Facebook from '../../assets/images/facebook.png';
import FooterDuckie from '../../assets/images/footer-duckie.png';
import Instagram from '../../assets/images/instagram.png';
import LinkedIn from '../../assets/images/linkedin.png';
import YouTube from '../../assets/images/youtube.png';
import c from './FooterSection.module.scss';

const FooterSection = () => {
  return (
    <footer className={c.footer}>
      <div className={c.backgroundWrapper}>
        <div className={c.background}>
          <img className={c.sticker} src={DaysSticker} alt='' />
          <div className={c.footerTitleWrapper}>
            <h2 className={c.bigText}>TL;DR</h2>
            <h2 className={c.bigText}>DOĐI NA DAYSE</h2>
            <button className={c.button}>
              {`[ `}
              REGISTRIRAJ SVOJ DOLAZAK
              {` ]`}
            </button>
          </div>
          <img className={c.duckie} src={FooterDuckie} alt='' />
        </div>
      </div>
      <div className={c.bottomWrapper}>
        <div className={c.questionsWrapper}>
          <h2 className={clsx(c.bigText, c.mb54)}>IMAŠ JOŠ PITANJA?</h2>
          <button className={c.button}>
            {`[ `}
            REGISTRIRAJ SVOJ DOLAZAK
            {` ]`}
          </button>
          <div className={c.socialsWrapper}>
            <img
              className={clsx(c.socialsImage, c.mt28)}
              src={Facebook}
              alt='facebook'
            />
            <img
              className={clsx(c.socialsImage, c.mt60)}
              src={LinkedIn}
              alt='linkedin'
            />
            <div>
              <img className={c.socialsImage} src={Instagram} alt='instagram' />
            </div>
            <img
              className={clsx(c.socialsImage, c.mt52)}
              src={YouTube}
              alt='youtube'
            />
          </div>
        </div>
        <div className={c.dottedRulerWrapper}>
          <div className={c.dottedRuler}>
            .....................................................................................................................................................................
          </div>
        </div>
        <div className={c.bottomSmallTextWrapper}>
          <p>© DUMPDAYS</p>
          <p>
            Napravljeno jedva, na prišu, sa nikakvim PM skillovima — al iz čiste
            ljubavi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
