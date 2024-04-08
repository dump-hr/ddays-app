import DuckieSection from 'components/DuckieSection';
import MobileMenu from 'components/MobileMenu';
import { useState } from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import LocationSection from '../../components/LocationSection';
import Schedule from '../../components/Schedule';

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen] = useState(false);
  const RegisterButton = <Button>Registriraj se</Button>;

  return (
    <>
      <MobileMenu Button={RegisterButton} isOpen={mobileMenuOpen} />
      <Header Button={RegisterButton} />
      <Hero Button={RegisterButton} />
      <DuckieSection />
      <Schedule />
      <LocationSection />
    </>
  );
};
