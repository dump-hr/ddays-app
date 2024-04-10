import c from './FooterSection.module.scss';

const FooterSection = () => {
  return (
    <footer className={c.footer}>
      <div className={c.background}>
        <div className={c.footerTitleWrapper}>
          <h2 className={c.bigText}>TL;DR</h2>
          <h2 className={c.bigText}>DOĐI NA DAYSE</h2>
          <button className={c.button}>
            {`[ `}
            REGISTRIRAJ SVOJ DOLAZAK
            {` ]`}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
