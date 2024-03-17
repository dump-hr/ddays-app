import ScrollingTitle from '../ScrollingTitle';
import c from './Hero.module.scss';

type HeroProps = {
  Button: React.ReactNode;
};

const Hero = ({ Button }: HeroProps) => {
  return (
    <section className={c.hero}>
      <div className={c.content}>
        <ScrollingTitle />
      </div>
      <nav className={c.menu}>
        <a href=''>Konferencija</a>
        <a href=''>Speakeri</a>
        <a href=''>Raspored</a>
        <a href=''>Sponzori</a>
        <a href=''>Kontakt</a>
      </nav>
      {Button}
    </section>
  );
};

export default Hero;
