import clsx from 'clsx';
import { SectionBreaker } from 'components/SectionBreaker';

import DaysSticker from '../../assets/images/days-sticker-big.webp';
import Facebook from '../../assets/images/facebook.webp';
import FooterDuckie from '../../assets/images/footer-duckie.webp';
import Instagram from '../../assets/images/instagram.webp';
import LinkedIn from '../../assets/images/linkedin.webp';
import YouTube from '../../assets/images/youtube.webp';
import c from './FooterSection.module.scss';

const FooterSection = () => {
  return (
    <footer className={c.footer}>
      <div className={c.backgroundWrapper}>
        <div className={c.background}>
          <img className={c.sticker} src={DaysSticker} alt='' />
          <div className={c.footerTitleWrapper}>
            <h2 className={c.bigText}>TL;DR</h2>
            <h2 className={c.bigText}>DOĐI NA DAYSE.</h2>
            <button
              className={clsx(c.button, c.grainyButton)}
              onClick={() =>
                (window.location.href = 'https://days-app.dump.hr/registration')
              }>
              {`[ `}
              REGISTRIRAJ SVOJ DOLAZAK
              {` ]`}
            </button>
          </div>
          <img className={c.duckie} src={FooterDuckie} alt='' />
          <SectionBreaker fg='dark' className={c.sectionBreaker} />
        </div>
      </div>
      <div className={c.bottomWrapper} id='kontakt'>
        <div className={c.questionsWrapper}>
          <h2 className={clsx(c.bigText, c.mb54)}>IMAŠ JOŠ PITANJA?</h2>

          <a
            className={clsx(c.button, c.grainyButton)}
            href='mailto:info@dump.hr'>
            {`[ `}
            KONTAKTIRAJ DUMPOVCE
            {` ]`}
          </a>
          <div className={c.socialsWrapper}>
            <a
              className={c.facebook}
              href='https://www.facebook.com/dump.hr/'
              target='_blank'>
              <img className={c.socialsImage} src={Facebook} alt='facebook' />
            </a>
            <a
              className={c.linkedin}
              href='https://hr.linkedin.com/company/dumpovci'
              target='_blank'>
              <img className={c.socialsImage} src={LinkedIn} alt='linkedin' />
            </a>
            <a
              className={c.instagram}
              href='https://www.instagram.com/dumpovci/'
              target='_blank'>
              <img className={c.socialsImage} src={Instagram} alt='instagram' />
            </a>

            <a
              className={c.youtube}
              href='https://www.youtube.com/@dumpovci'
              target='_blank'>
              <img className={c.socialsImage} src={YouTube} alt='youtube' />
            </a>
          </div>
        </div>
        <div className={c.dottedRuler}></div>
        <div className={c.bottomSmallTextWrapper}>
          <p className={c.mb24}>© DUMPDAYS</p>
          <p className={c.footerBottomSmallText}>
            Napravljeno uz tešku muku, bez PM skillova - al' iz čiste ljubavi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
