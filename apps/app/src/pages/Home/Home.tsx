import { Header } from '../../components/Header';
import c from './Home.module.scss';
import TopCompaniesSection from './sections/TopCompaniesSection';
import EventsSection from './sections/EventsSection';
import LocationSection from '../../components/LocationSection';
import CodePopup from './popups/CodePopup/CodePopup';

const HomePage = () => {
  return (
    <div className={c.page}>
      <header className={c.header}>
        <Header />
      </header>
      <main className={c.main}>
        <EventsSection />
        <LocationSection />
        <TopCompaniesSection />

        <CodePopup isOpen={true} closePopup={() => {}} />
      </main>
    </div>
  );
};

export default HomePage;
