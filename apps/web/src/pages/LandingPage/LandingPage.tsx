import { ReactLenis } from '@studio-freight/react-lenis';
import DuckieSection from 'components/DuckieSection';
import SpeakersSection from 'components/SpeakersSection';
import MobileMenu from 'components/MobileMenu';
import { useState } from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import LocationSection from '../../components/LocationSection';
import Schedule from '../../components/Schedule';
import { landingNavigation } from '../../constants/landing-navigation';

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const RegisterButton = <Button>Registriraj se</Button>;

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <ReactLenis root>
      {window.innerWidth < 768 && (
        <MobileMenu
          Button={RegisterButton}
          isOpen={mobileMenuOpen}
          toggle={toggleMobileMenu}
          items={landingNavigation}
        />
      )}
      <Header Button={HeaderButton} toggleMobileMenu={toggleMobileMenu} />
      <Hero Button={HeaderButton} items={landingNavigation} />
      <DuckieSection />
      <Schedule />
      <SpeakersSection />
      <LocationSection />
    </ReactLenis>
  );
};
