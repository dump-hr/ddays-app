import Facebook from '../../assets/images/FB.png';
import Instagram from '../../assets/images/IG.png';
import LinkedIn from '../../assets/images/LN.png';
import YouTube from '../../assets/images/YT.png';
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
          <p>© DUMPDAYS 2026</p>
          <p className={c.footerBottomSmallText}>
            Napravljeno uz tešku muku, bez PM skillova - al' iz čiste ljubavi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TemporaryFooterSection;
