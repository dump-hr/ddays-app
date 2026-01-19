import Facebook from '../../assets/images/facebook.webp';
import Instagram from '../../assets/images/instagram.webp';
import LinkedIn from '../../assets/images/linkedin.webp';
import YouTube from '../../assets/images/youtube.webp';
import c from './TemporaryFooterSection.module.scss';

const TemporaryFooterSection = () => {
  return (
    <footer className={c.footer}>
      <div className={c.bottomWrapper} id='kontakt'>
        <div className={c.questionsWrapper}>
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
          <div
            className={c.mb24}
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <p>© DUMPDAYS 2026</p>
          </div>
          <p className={c.footerBottomSmallText}>
            Napravljeno uz tešku muku, bez PM skillova - al' iz čiste ljubavi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TemporaryFooterSection;
