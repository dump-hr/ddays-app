import c from './FlyTalksPage.module.scss';

const FlyTalksPage = () => {
  return (
    <div className={c.page}>
      <div className={c.content}>
        <section className={c.titleSection}>
          <h2 className={c.title}>Fly Talks</h2>
          <p>Ukupno prihvaćenih prijava: 3/25</p>
        </section>
      </div>
    </div>
  );
};

export default FlyTalksPage;
