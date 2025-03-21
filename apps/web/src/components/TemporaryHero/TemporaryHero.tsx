import Button from 'components/Button';

import ScrollingTitle from '../ScrollingTitle';
import c from './TemporaryHero.module.scss';

const TemporaryHero = () => {
  function openBrochure() {
    window.open(
      'https://drive.google.com/file/d/1lxAC5i2bDmS76NvG_D6BEL2E0AysBQlW/view?usp=drive_link',
      '_blank',
    );
  }

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
          <Button onClick={openArchivedWeb}>Posjeti web</Button>
          <Button className={c.orangeButton} onClick={openBrochure}>
            Postani sponzor
          </Button>
        </div>
      </div>

      <div className={c.buttonsWrapper}></div>
    </section>
  );
};

export default TemporaryHero;
