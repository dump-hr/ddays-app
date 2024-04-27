import { ReactLenis } from '@studio-freight/react-lenis';
import DuckieSection from 'components/DuckieSection';
import EventsSection from 'components/EventsSection';
import FooterSection from 'components/FooterSection';
import FrequentlyAskedQuestionsSection from 'components/FrequentlyAskedQuestionsSection';
import GallerySection from 'components/GallerySection';
import MobileMenu from 'components/MobileMenu';
import RegistrationSection from 'components/RegistrationSection';
import { SectionBreaker } from 'components/SectionBreaker';
import SpeakersSection from 'components/SpeakersSection';
import SponsorSection from 'components/SponsorSection';
import TestimonialsSection from 'components/TestimonialsSection';
import { useState } from 'react';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import LocationSection from '../../components/LocationSection';
import ScheduleSection from '../../components/ScheduleSection';
import { landingNavigation } from '../../constants/landing-navigation';

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const RegisterButton = (
    <Button
      onClick={() => (window.location.href = 'https://days-app.dump.hr/login')}>
      Registriraj se
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
      <Hero Button={RegisterButton} items={landingNavigation} />
      <DuckieSection />
      <EventsSection />
      <ScheduleSection />
      <SectionBreaker fg='orange' bg='light' />
      <SpeakersSection />
      <SectionBreaker fg='green' bg='orange' />
      <LocationSection />
      <SponsorSection />
      <SectionBreaker fg='dark' bg='light' />
      <RegistrationSection />
      <GallerySection />
      <TestimonialsSection />
      <FrequentlyAskedQuestionsSection />
      <FooterSection />
    </ReactLenis>
  );
};
