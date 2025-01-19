import c from './Home.module.scss';
import TopCompaniesSection from './sections/TopCompaniesSection';

const Home = () => {
  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <TopCompaniesSection />
      </main>
    </div>
  );
};

export default Home;
