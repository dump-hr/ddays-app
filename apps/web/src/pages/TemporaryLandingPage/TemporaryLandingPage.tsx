import { ReactLenis } from '@studio-freight/react-lenis';
import HeroSection from 'components/HeroSection';
import MobileMenu from 'components/MobileMenu';
import Navbar from 'components/Navbar';
import TemporaryBanner from 'components/TemporaryBanner';
import TemporaryFooterSection from 'components/TemporaryFooterSection';
import TemporaryPastEditions from 'components/TemporaryPastEditions';
import { useState } from 'react';

import Button from '../../components/Button';
import { landingNavigation } from '../../constants/landing-navigation';
import DuckieSection from 'components/DuckieSection';

export const TemporaryLandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const RegisterButton = (
    <Button onClick={() => window.open('https://days.dump.hr/app/', '_blank')}>
      Registriraj se
    </Button>
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <ReactLenis root>
      <Navbar items={landingNavigation} toggleMobileMenu={toggleMobileMenu} />
      {window.innerWidth < 768 && (
        <MobileMenu
          Button={RegisterButton}
          isOpen={mobileMenuOpen}
          toggle={toggleMobileMenu}
          items={landingNavigation}
        />
      )}
      <HeroSection />
      <DuckieSection />
      <TemporaryPastEditions />
      <TemporaryBanner />
      <TemporaryFooterSection />
    </ReactLenis>
  );
};
