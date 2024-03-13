import Schedule from '../../components/Schedule';
import ScrollingTitle from '../../components/ScrollingTitle';
import c from './LandingPage.module.scss';

export const LandingPage: React.FC = () => {
  return (
    <>
      <section className={c.hero}>
        <div className={c.content}>
          <ScrollingTitle />
        </div>
      </section>
      <Schedule />
    </>
  );
};
