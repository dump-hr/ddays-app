import React from 'react';
import RecommendationsButton from '../../components/RecommendationsButton';
import TopCompany from '../../components/TopFirm';
import c from './Home.module.scss';
import { companies } from './companies';

const Home = () => {
  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section className={c.topCompanies}>
          <div className={c.mainContent}>
            <h2 className={c.title}>Top 5 firma</h2>
            <p className={c.description}>
              Otkrij najbolje sponzorske štandove prema ocjenama posjetitelja
              konferencije.
            </p>
            {companies.map((company, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <div className={c.divider} />}
                <TopCompany company={company} number={index + 1} />
              </React.Fragment>
            ))}
          </div>
          <RecommendationsButton className={c.duck} />
        </section>
      </main>
    </div>
  );
};

export default Home;
