import clsx from 'clsx';

import DaysSticker from '../../assets/images/days-sticker-big.png';
import Facebook from '../../assets/images/facebook.png';
import FooterDuckie from '../../assets/images/footer-duckie.png';
import Instagram from '../../assets/images/instagram.png';
import LinkedIn from '../../assets/images/linkedin.png';
import SectionBreaker from '../../assets/images/section-breaker-footer.png';
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
          <img className={c.sectionBreaker} src={SectionBreaker} alt='' />
        </div>
      </div>
      <div className={c.bottomWrapper}>
        <div className={c.questionsWrapper}>
          <h2 className={clsx(c.bigText, c.mb54)}>IMAŠ JOŠ PITANJA?</h2>

          <a className={c.button} href='mailto:info@dump.hr'>
            {`[ `}
            KONTAKTIRAJ DUMPOVCE
            {` ]`}
          </a>
          <div className={c.socialsWrapper}>
            <a href='https://www.facebook.com/dump.hr/' target='_blank'>
              <img
                className={clsx(c.socialsImage, c.facebook)}
                src={Facebook}
                alt='facebook'
              />
            </a>
            <a href='https://hr.linkedin.com/company/dumpovci' target='_blank'>
              <img
                className={clsx(c.socialsImage, c.linkedin)}
                src={LinkedIn}
                alt='linkedin'
              />
            </a>
            <div>
              <a href='https://www.instagram.com/dumpovci/' target='_blank'>
                <img
                  className={c.socialsImage}
                  src={Instagram}
                  alt='instagram'
                />
              </a>
            </div>
            <a href='https://www.youtube.com/@dumpovci' target='_blank'>
              <img
                className={clsx(c.socialsImage, c.youtube)}
                src={YouTube}
                alt='youtube'
              />
            </a>
          </div>
        </div>
        <div className={c.dottedRulerWrapper}>
          <div className={c.dottedRuler}>
            ...............................................................................................................................................................................................................................................................................................................................
          </div>
        </div>
        <div className={c.bottomSmallTextWrapper}>
          <p className={c.mb24}>© DUMPDAYS</p>
          <p className={c.footerBottomSmallText}>
            Napravljeno jedva, na prišu, sa nikakvim PM skillovima — al iz čiste
            ljubavi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
