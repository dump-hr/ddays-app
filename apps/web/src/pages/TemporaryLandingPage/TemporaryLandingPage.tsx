import { ReactLenis } from '@studio-freight/react-lenis';
import TemporaryFooterSection from 'components/TemporaryFooterSection';
import TemporaryHeader from 'components/TemporaryHeader';
import TemporaryHero from 'components/TemporaryHero';
import TemporaryPastEditions from 'components/TemporaryPastEditions';

export const TemporaryLandingPage: React.FC = () => {
  return (
    <ReactLenis root>
      <TemporaryHeader />
      <TemporaryHero />
      <TemporaryPastEditions />
      <TemporaryFooterSection />
    </ReactLenis>
  );
};
