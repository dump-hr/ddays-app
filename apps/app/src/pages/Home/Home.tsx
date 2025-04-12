import { Header } from '../../components/Header';
import c from './Home.module.scss';
import TopCompaniesSection from './sections/TopCompaniesSection';
import EventsSection from './sections/EventsSection';
import LocationSection from '../../components/LocationSection';
import CodePopup from './popups/CodePopup/CodePopup';
import toast from 'react-hot-toast';
import { useState } from 'react';

const HomePage = () => {
  function handleSuccessfulCodeSubmit() {
    toast.success('Kod je uspješno unesen!');
  }

  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);

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
      </main>
    </div>
  );
};

export default HomePage;
