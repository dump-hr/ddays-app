import { ReactLenis } from '@studio-freight/react-lenis';
import DuckieSection from 'components/DuckieSection';
import FooterSection from 'components/FooterSection';
import FrequentlyAskedQuestionsSection from 'components/FrequentlyAskedQuestionsSection';
import GallerySection from 'components/GallerySection';
import HeroSection from 'components/HeroSection';
import MobileMenu from 'components/MobileMenu';
import RegistrationSection from 'components/RegistrationSection';
import { SectionBreaker } from 'components/SectionBreaker';
import JobsSection from 'components/JobsSection';
import SpeakersSection from 'components/SpeakersSection';
import SponsorSection from 'components/SponsorSection';
import { StatsSection } from 'components/StatsSection';
import TestimonialsSection from 'components/TestimonialsSection';
import { useState } from 'react';

import Button from '../../components/Button';
import LocationSection from '../../components/LocationSection';
import Navbar from '../../components/Navbar';
import ScheduleSection from '../../components/ScheduleSection';
import { landingNavigation } from '../../constants/landing-navigation';
import c from './LandingPage.module.scss';

export const LandingPage: React.FC = () => {
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
      <SectionBreaker fg='light' className={c.transparentBackground} />
      <DuckieSection />
      <SectionBreaker bg='light' fg='dark' />
      <StatsSection />
      <ScheduleSection />
      <SectionBreaker bg='light' fg='orange' />
      <SpeakersSection />
      <SectionBreaker bg='orange' fg='green' />
      <LocationSection />
      <SectionBreaker bg='green' fg='light' />
      <SponsorSection />
      <JobsSection />
      <RegistrationSection />
      <SectionBreaker bg='dark' fg='green' />
      <GallerySection />
      <TestimonialsSection />
      <FrequentlyAskedQuestionsSection />
      <SectionBreaker fg='dark' flipped className={c.flippedAndTransparent} />
      <FooterSection />
    </ReactLenis>
  );
};
