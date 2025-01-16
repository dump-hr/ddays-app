import TopCompany from '../../components/TopFirm';
import c from './Home.module.scss';
import { companies } from './companies';

const Home = () => {
  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section className={c.topCompanies}>
          <h2 className={c.title}>Top 5 firma</h2>
          <p className={c.description}>
            Otkrij najbolje sponzorske štandove prema ocjenama posjetitelja
            konferencije.
          </p>
          {companies.map((company, index) => (
            <>
              {index !== 0 && <div className={c.divider} />}
              <TopCompany key={index} company={company} number={index + 1} />
            </>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
