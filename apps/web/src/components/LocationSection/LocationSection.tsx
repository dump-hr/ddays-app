import c from './LocationSection.module.scss';

const LocationSection = () => {
  return (
    <div className={c.container}>
      <h1 className={c.title}>lokacija</h1>
      <div className={c.stampContainer}>
        <div className={c.stamp}></div>
        <div className={c.stamp}>
          <h2>Ista adresa, više sadržaja</h2>
          <h3>FESB Ul. Ruđera Boškovića SPLIT, HRVATSKA</h3>
        </div>
      </div>
      <div className={c.exhibitionContainer}>
        <h3>izložbeni prostor</h3>
        <div className={c.exhibitionInfo}>
          <div className={c.exhibitionLocation}>fesb</div>
          <p>
            Posjeti štandove, skupljaj razne poklone, okušaj se u kvizovima i
            kul izazovima, a uz to ugrabi i najbolju poslovnu priliku za sebe.
          </p>
        </div>
      </div>
      <div className={c.date}>23. — 24. 05. 2024.</div>
    </div>
  );
};

export default LocationSection;
