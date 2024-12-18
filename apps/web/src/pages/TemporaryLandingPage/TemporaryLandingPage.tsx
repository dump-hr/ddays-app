import { ReactLenis } from '@studio-freight/react-lenis';
import MobileMenu from 'components/MobileMenu';
import TemporaryFooterSection from 'components/TemporaryFooterSection';
import TemporaryHeader from 'components/TemporaryHeader';
import TemporaryHero from 'components/TemporaryHero';
import { useState } from 'react';

import Button from '../../components/Button';
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
      <TemporaryHeader />
      {window.innerWidth < 768 && (
        <MobileMenu
          Button={RegisterButton}
          isOpen={mobileMenuOpen}
          toggle={toggleMobileMenu}
          items={landingNavigation}
        />
      )}
      <TemporaryHero Button={RegisterButton} />
      <TemporaryFooterSection />
    </ReactLenis>
  );
};
