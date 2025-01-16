import c from './Home.module.scss';

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
        </section>
      </main>
    </div>
  );
};

export default Home;
