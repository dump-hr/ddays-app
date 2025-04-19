import Button from 'components/Button';

import ScrollingTitle from '../ScrollingTitle';
import c from './TemporaryHero.module.scss';

const TemporaryHero = () => {
  function openArchivedWeb() {
    window.open('https://2024-days.dump.hr/', '_blank');
  }

  return (
    <section className={c.hero}>
      <div className={c.content}>
        <ScrollingTitle />
      </div>
      <div className={c.textButtonsWrapper}>
        <div className={c.buttons}>
          <Button onClick={openArchivedWeb}>Posjeti web 2024.</Button>
        </div>
      </div>

      <div className={c.buttonsWrapper}></div>
    </section>
  );
};

export default TemporaryHero;
