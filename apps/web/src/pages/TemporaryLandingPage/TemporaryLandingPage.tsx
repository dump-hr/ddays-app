import { ReactLenis } from '@studio-freight/react-lenis';
import MobileMenu from 'components/MobileMenu';
import Navbar from 'components/Navbar';
import TemporaryBanner from 'components/TemporaryBanner';
import TemporaryFooterSection from 'components/TemporaryFooterSection';
import TemporaryHero from 'components/TemporaryHero';
import TemporaryPastEditions from 'components/TemporaryPastEditions';
import { useState } from 'react';

import Button from '../../components/Button';
import { landingNavigation } from '../../constants/landing-navigation';

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
      <TemporaryHero />
      <TemporaryPastEditions />
      <TemporaryBanner />
      <TemporaryFooterSection />
    </ReactLenis>
  );
};
