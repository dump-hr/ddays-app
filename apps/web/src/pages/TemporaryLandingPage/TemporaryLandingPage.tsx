import { ReactLenis } from '@studio-freight/react-lenis';
import Button from 'components/Button';
import Header from 'components/Header';
import Hero from 'components/Hero';
import MobileMenu from 'components/MobileMenu';
import TemporaryFooterSection from 'components/TemporaryFooterSection';
import { useState } from 'react';

import { temporaryLandingNavigation } from '../../constants/temporary-landing-navigation';

export const TemporaryLandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const RegisterButton = (
    <Button
      onClick={() => (window.location.href = 'https://days.dump.hr/app/login')}>
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
          items={temporaryLandingNavigation}
        />
      )}
      <Hero Button={RegisterButton} items={temporaryLandingNavigation} />
      <TemporaryFooterSection />
    </ReactLenis>
  );
};
