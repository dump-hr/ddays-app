import ScrollingTitle from '../ScrollingTitle';
import c from './Hero.module.scss';

type HeroProps = {
  Button: React.ReactNode;
  items: { name: string; path: string }[];
};

const Hero = ({ Button, items }: HeroProps) => {
  return (
    <section className={c.hero}>
      <div className={c.content}>
        <ScrollingTitle />
      </div>
      <nav className={c.menu}>
        {items.map((item) => (
          <a key={item.name} href={item.path} className={c.item}>
            {item.name}
          </a>
        ))}
      </nav>
      {Button}
      <p className={c.text}>
        Besplatna konferencija
        <br />
        nove generacije
      </p>
    </section>
  );
};

export default Hero;
