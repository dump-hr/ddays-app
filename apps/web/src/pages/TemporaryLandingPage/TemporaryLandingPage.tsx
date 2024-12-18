import { ReactLenis } from '@studio-freight/react-lenis';
import TemporaryFooterSection from 'components/TemporaryFooterSection';
import TemporaryHeader from 'components/TemporaryHeader';
import TemporaryHero from 'components/TemporaryHero';

import Button from '../../components/Button';

export const TemporaryLandingPage: React.FC = () => {
  const RegisterButton = (
    <Button
      onClick={() => (window.location.href = 'https://days-app.dump.hr/login')}>
      Prijavi se
    </Button>
  );

  return (
    <ReactLenis root>
      <TemporaryHeader />

      <TemporaryHero Button={RegisterButton} />
      <TemporaryFooterSection />
    </ReactLenis>
  );
};
