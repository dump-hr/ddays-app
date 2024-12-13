import { ReactLenis } from '@studio-freight/react-lenis';
import MobileMenu from 'components/MobileMenu';
import TemporaryFooterSection from 'components/TemporaryFooterSection';
import TemporaryHero from 'components/TemporaryHero';
import { useState } from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { landingNavigation } from '../../constants/landing-navigation';

export const TemporaryLandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const RegisterButton = (
    <Button
      onClick={() => (window.location.href = 'https://days-app.dump.hr/login')}>
      Prijavi se
    </Button>
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <ReactLenis root>
      <Header Button={RegisterButton} toggleMobileMenu={toggleMobileMenu} />
      {window.innerWidth < 768 && (
        <MobileMenu
          Button={RegisterButton}
          isOpen={mobileMenuOpen}
          toggle={toggleMobileMenu}
          items={landingNavigation}
        />
      )}
      <TemporaryHero Button={RegisterButton} items={landingNavigation} />
      <TemporaryFooterSection />
    </ReactLenis>
  );
};
