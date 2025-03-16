import c from './FlyTalksWelcome.module.scss';
import removeIcon from '../../assets/icons/remove.svg';
import Button from '../../components/Button/Button';
import FlyTalksDuckImage from '../../assets/images/fly-talks-duck.png';
import { useNavigate } from 'react-router-dom';

interface FlyTalksWelcomeProps {
  setFirstFlyTalksVisit: (value: boolean) => void;
}

const FlyTalksWelcome: React.FC<FlyTalksWelcomeProps> = ({
  setFirstFlyTalksVisit,
}) => {
  const navigate = useNavigate();

  const handleNextButton = () => {
    setFirstFlyTalksVisit(false);
    localStorage.setItem('firstFlyTalksVisit', 'false');
  };

  return (
    <div className={c.page}>
      <header className={c.header}>
        <p>Fly Talks</p>
        <img className={c.duckImage} src={FlyTalksDuckImage} alt='' />
      </header>
      <main className={c.main}>
        <div className={c.mainContent}>
          <div>
            <div className={c.mainHeader}>
              <p>Tražiš posao?</p>
              <img
                src={removeIcon}
                alt=''
                height={20}
                width={20}
                onClick={() => navigate('/app')}
              />
            </div>
            <p className={c.copyParagraph}>
              Fly Talks ti omogućuju da razgovaraš 1-na-1 s poslodavcima,
              upoznaš ih i otkriješ jeste li idealan match.
              <br />
              <br />
              Tvrtke smo podijelili u nekoliko skupina. Odaberi jednu koja ti
              najviše odgovara i iskoristi 8 minuta za razgovor sa svakom
              tvrtkom iz te skupine. Tvrtke će selektirati nekoliko kandidata na
              temelju popunjenih prijava. <br />
              <br />
              Prijavi se i pokaži zašto si baš ti najbolji izbor za njih!
            </p>
          </div>
          <Button
            variant='orange'
            className={c.nextButton}
            onClick={handleNextButton}>
            Dalje
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FlyTalksWelcome;
