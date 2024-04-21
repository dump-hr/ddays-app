import fesbBackground from '../../assets/images/fesb-background.png';
import vintageFesb from '../../assets/vintage-fesb.png';
import c from './LocationSection.module.scss';

const LocationSection = () => {
  return (
    <div className={c.containerWrapper}>
      <div className={c.titleContainer}>
        <div className={c.titleWrapper}></div>
        <h1 className={c.title}>LOKACIJA</h1>
        <img src={fesbBackground} alt='fesb' className={c.titleBottomImage} />
        <div className={c.stampContainer}>
          <div className={c.stamp}>
            <img src={vintageFesb} alt='vintage fesb' />
          </div>
          <div className={c.stamp}>
            <div className={c.stampContent}>
              <h2 className={c.stampContentTitle}>
                Ista adresa, više sadržaja
              </h2>
              <div className={c.stampContentFooter}>
                <div className={c.dottedRuler}>
                  ..............................................
                </div>
                <div className={c.stampContentFooterText}>
                  <h3>FESB</h3>
                  <h3>Ul. Ruđera Boškovića</h3>
                  <h3>SPLIT, HRVATSKA</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={c.locationInfo}>
        <div className={c.locationInfoLeft}>
          <h2>izložbeni prostor</h2>
          <div className={c.locationInfoLeftButton}>FESB</div>
        </div>
        <p className={c.locationInfoRight}>
          Posjeti štandove, skupljaj razne poklone, okušaj se u kvizovima i kul
          izazovima, a uz to ugrabi i najbolju poslovnu priliku za sebe.
        </p>
        <div className={c.dottedRuler}>
          ................................................................................................................................................................................................................
        </div>
      </div>
      <div className={c.date}>23. — 24. 05. 2024.</div>
    </div>
  );
};

export default LocationSection;
