import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import DuckieSection from 'components/DuckieSection';
import SpeakersSection from 'components/SpeakersSection';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import LocationSection from '../../components/LocationSection';
import Schedule from '../../components/Schedule';

export const LandingPage: React.FC = () => {
  const HeaderButton = <Button>Registriraj se</Button>;
  //eslint-disable-next-line
  const lenis = useLenis(({ scroll }) => {});

  return (
    <>
      <ReactLenis root>
        <Header Button={HeaderButton} />
        <Hero Button={HeaderButton} />
        <DuckieSection />
        <Schedule />
        <SpeakersSection />
        <LocationSection />
      </ReactLenis>
    </>
  );
};
