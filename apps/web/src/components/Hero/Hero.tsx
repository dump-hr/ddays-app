import ScrollingTitle from '../ScrollingTitle';
import c from './Hero.module.scss';

const Hero = () => {
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
    </section>
  );
};

export default Hero;
