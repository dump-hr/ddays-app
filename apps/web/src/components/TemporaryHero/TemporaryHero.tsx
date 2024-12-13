import ScrollingTitle from '../ScrollingTitle';
import c from './TemporaryHero.module.scss';

type HeroProps = {
  Button: React.ReactNode;
};

const TemporaryHero = ({ Button }: HeroProps) => {
  return (
    <section className={c.hero}>
      <div className={c.content}>
        <ScrollingTitle />
      </div>
      {Button}
      <p className={c.text}>
        Besplatna konferencija
        <br />
        za novu generaciju
      </p>
    </section>
  );
};

export default TemporaryHero;
