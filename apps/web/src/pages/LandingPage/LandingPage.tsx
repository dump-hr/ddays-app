import DuckieSection from 'components/DuckieSection';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Schedule from '../../components/Schedule';

export const LandingPage: React.FC = () => {
  const HeaderButton = <Button>Registriraj se</Button>;

  return (
    <>
      <Header Button={HeaderButton} />
      <Hero Button={HeaderButton} />
      <DuckieSection />
      <Schedule />
    </>
  );
};
