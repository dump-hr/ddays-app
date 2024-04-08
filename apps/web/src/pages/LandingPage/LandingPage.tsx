import DuckieSection from 'components/DuckieSection';
import MobileMenu from 'components/MobileMenu';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import LocationSection from '../../components/LocationSection';
import Schedule from '../../components/Schedule';

export const LandingPage: React.FC = () => {
  const HeaderButton = <Button>Registriraj se</Button>;

  return (
    <>
      <MobileMenu />
      <Header Button={HeaderButton} />
      <Hero Button={HeaderButton} />
      <DuckieSection />
      <Schedule />
      <LocationSection />
    </>
  );
};
