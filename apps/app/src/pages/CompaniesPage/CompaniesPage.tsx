import c from './CompaniesPage.module.scss';

export const CompaniesPage = () => {
  return (
    <div className={c.page}>
      <header className={c.header}>
        <h2 className={c.title}>Tvrtke</h2>
      </header>
      <main className={c.main}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          rem autem officia laudantium veniam exercitationem ab unde voluptatum
          voluptas. Labore est minima sunt deserunt. Voluptatibus sapiente
          aspernatur tempora error voluptates!
        </p>
      </main>
    </div>
  );
};
