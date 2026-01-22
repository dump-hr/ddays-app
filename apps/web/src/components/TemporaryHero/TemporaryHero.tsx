import Button from 'components/Button';

import ScrollingTitle from '../ScrollingTitle';
import c from './TemporaryHero.module.scss';

const TemporaryHero = () => {
  function openArchivedWeb() {
    window.open(`https://days.dump.hr/app/`, '_blank');
  }

  return (
    <section className={c.hero}>
      <div className={c.content}>
        <ScrollingTitle />
      </div>
      <div className={c.mobileContent}>
        <Button onClick={openArchivedWeb} className={c.button}>
          {' '}
          DUMP DAYS WEB APP
        </Button>
        <p className={c.text}>
          BESPLATNA KONFERENCIJA <br /> ZA NOVU GENERACIJU
        </p>
      </div>
    </section>
  );
};

export default TemporaryHero;
