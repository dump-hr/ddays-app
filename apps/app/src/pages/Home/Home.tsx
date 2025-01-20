import c from './Home.module.scss';
import TopCompaniesSection from './sections/TopCompaniesSection';
import EventsSection from './sections/EventsSection';

const Home = () => {
  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <EventsSection />
        <TopCompaniesSection />
      </main>
    </div>
  );
};

export default Home;
