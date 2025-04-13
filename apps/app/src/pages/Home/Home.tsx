import { Header } from '../../components/Header';
import c from './Home.module.scss';
import TopCompaniesSection from './sections/TopCompaniesSection';
import EventsSection from './sections/EventsSection';
import LocationSection from '../../components/LocationSection';
import CodePopup from './popups/CodePopup/CodePopup';
import { useState } from 'react';
import PointModifierPopup from './popups/PointModifierPopup';
import NewLevelPopup from './popups/NewLevelPopup';

const HomePage = () => {
  function handleSuccessfulCodeSubmit() {
    setIsCodePopupOpen(false);
    const isNewLevel = false;

    if (isNewLevel) {
      setIsNewLevelPopupOpen(true);
      return;
    }

    setIsPointModifierPopupOpen(true);
  }

  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);
  const [isPointModifierPopupOpen, setIsPointModifierPopupOpen] =
    useState(false);
  const [isNewLevelPopupOpen, setIsNewLevelPopupOpen] = useState(false);

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
          points={10}
          isOpen={isPointModifierPopupOpen}
          closePopup={() => setIsPointModifierPopupOpen(false)}
        />

        <NewLevelPopup
          isOpen={isNewLevelPopupOpen}
          closePopup={() => setIsNewLevelPopupOpen(false)}
        />
      </main>
    </div>
  );
};

export default HomePage;
