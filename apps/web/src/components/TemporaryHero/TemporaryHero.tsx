import Button from 'components/Button';

import ScrollingTitle from '../ScrollingTitle';
import c from './TemporaryHero.module.scss';

const TemporaryHero = () => {
  return (
    <section className={c.hero}>
      <div className={c.content}>
        <ScrollingTitle />
      </div>
      <div className={c.textButtonsWrapper}>
        <div className={c.buttons}>
          <Button>Posjeti web</Button>
          <Button>Postani sponzor</Button>
        </div>
      </div>

      <div className={c.buttonsWrapper}></div>
    </section>
  );
};

export default TemporaryHero;
