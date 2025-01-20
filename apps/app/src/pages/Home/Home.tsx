import c from './Home.module.scss';
import EventsSection from './sections/EventsSection';

const Home = () => {
  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <EventsSection />
      </main>
    </div>
  );
};

export default Home;
