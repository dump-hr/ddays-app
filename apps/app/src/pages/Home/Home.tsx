import { Header } from '../../components/Header';
import c from './Home.module.scss';
import TopCompaniesSection from './sections/TopCompaniesSection';
import EventsSection from './sections/EventsSection';
import LocationSection from '../../components/LocationSection';
import CodePopup from './popups/CodePopup/CodePopup';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  function handleCodeSubmit(code: string) {
    toast(`Uneseni kod je: ${code}`, {
      icon: '🎉',
      style: {
        background: '#333',
        color: '#fff',
      },
      position: 'top-center',
    });
  }

  return (
    <div className={c.page}>
      <header className={c.header}>
        <Header />
      </header>
      <main className={c.main}>
        <EventsSection />
        <LocationSection />
        <TopCompaniesSection />

        <CodePopup
          isOpen={true}
          closePopup={() => {}}
          onSubmit={handleCodeSubmit}
        />
      </main>
    </div>
  );
};

export default HomePage;
