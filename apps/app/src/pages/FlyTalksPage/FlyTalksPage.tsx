import c from './FlyTalksPage.module.scss';
import removeIcon from '../../assets/icons/remove.svg';
import Button from '../../components/Button/Button';
import FlyTalksDuckImage from '../../assets/images/fly-talks-duck.png';

const FlyTalksPage = () => {
  return (
    <div className={c.page}>
      <header className={c.header}>
        <p>Fly Talks</p>
      </header>
      <img
        className={c.duckImage}
        src={FlyTalksDuckImage}
        alt=''
        className={c.duckImage}
      />
      <main className={c.main}>
        <div className={c.mainContent}>
          <div className={c.mainHeader}>
            <p>Tražiš posao?</p>
            <img src={removeIcon} alt='' height={20} width={20} />
          </div>
          <p className={c.copyParagraph}>
            Fly Talks ti omogućuju da razgovaraš 1-na-1 s poslodavcima, upoznaš
            ih i otkriješ jeste li idealan match.
            <br />
            <br />
            Tvrtke smo podijelili u nekoliko skupina. Odaberi jednu koja ti
            najviše odgovara i iskoristi 8 minuta za razgovor sa svakom tvrtkom
            iz te skupine. Tvrtke će selektirati nekoliko kandidata na temelju
            popunjenih prijava. <br />
            <br />
            Prijavi se i pokaži zašto si baš ti najbolji izbor za njih!
          </p>
          <Button variant='orange' className={c.nextButton}>
            Dalje
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FlyTalksPage;
