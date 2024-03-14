import ScrollingTitle from '../ScrollingTitle';
import c from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={c.hero}>
      <div className={c.content}>
        <ScrollingTitle />
      </div>
    </section>
  );
};

export default Hero;
