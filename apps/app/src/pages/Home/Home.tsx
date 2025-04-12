import { Header } from '../../components/Header';
import c from './Home.module.scss';
import TopCompaniesSection from './sections/TopCompaniesSection';
import EventsSection from './sections/EventsSection';
import LocationSection from '../../components/LocationSection';
import CodePopup from './popups/CodePopup/CodePopup';
import toast from 'react-hot-toast';
import { useState } from 'react';
import PointModifierPopup from './popups/PointModifierPopup';

const HomePage = () => {
  function handleSuccessfulCodeSubmit() {
    toast.success('Kod je uspješno unesen!');
    setIsCodePopupOpen(false);
    setIsPointModifierPopupOpen(true);
  }

  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);
  const [isPointModifierPopupOpen, setIsPointModifierPopupOpen] =
    useState(false);

  return (
    <div className={c.page}>
      <header className={c.header}>
        <Header openCodePopup={() => setIsCodePopupOpen(true)} />
      </header>
      <main className={c.main}>
        <EventsSection />
        <LocationSection />
        <TopCompaniesSection />

        <CodePopup
          isOpen={isCodePopupOpen}
          closePopup={() => setIsCodePopupOpen(false)}
          onSuccess={handleSuccessfulCodeSubmit}
        />

        <PointModifierPopup
          isOpen={isPointModifierPopupOpen}
          closePopup={() =>
            setIsPointModifierPopupOpen(false)
          }></PointModifierPopup>
      </main>
    </div>
  );
};

export default HomePage;
