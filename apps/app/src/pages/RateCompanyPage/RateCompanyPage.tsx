import c from './RateCompanyPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import { RouteNames } from '../../router/routes';
import StarRating from '../../components/StarRating';
import HRCloudLogo from '../../assets/images/HRCloud.svg';

export const RateCompanyPage = () => {
  return (
    <div>
      <div className={c.wrapper}>
        <div className={c.page}>
          <a href='https://days.dump.hr'>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </a>
        </div>
        <div className={c.container}>
          <div className={c.titleContainer}>
            <h1 className={c.title}>Ocjeni sponzorski štand</h1>
            <a href='https://days.dump.hr'>
              <img src={closeIcon} alt='Close login' className={c.closeIcon} />
            </a>
          </div>
          <div className={c.companyDetails}>
            <img src={HRCloudLogo} alt='Company logo' className={c.logo} />
            <span className={c.companyLocationAtConference}>Z4</span>
          </div>
          <div className={c.breakline}></div>
          <div className={c.ratingContainer}>
            <div className={c.ratingQuestion}>
              <h3>Generalni dojam štanda</h3>
              <span className={c.ratingQuestionText}>
                Kakav je dojam štand ostavio na tebe?
              </span>
              <StarRating style={{ marginTop: '16px' }} />
            </div>
            <div className={c.ratingQuestion}>
              <h3>Sadrzaj štanda</h3>
              <span className={c.ratingQuestionText}>
                Što se sve nudi? Je li ti bilo zabavno?
              </span>
              <StarRating style={{ marginTop: '16px' }} />
            </div>
            <div className={c.ratingQuestion}>
              <h3>Izlagači</h3>
              <span className={c.ratingQuestionText}>
                Ocjeni svoj dojam o izlagačima.
              </span>
              <StarRating style={{ marginTop: '16px' }} />
            </div>
          </div>

          <div className={c.buttonContainer}>
            <Button
              variant='orange'
              onClick={() => console.log('Button clicked')}>
              Spremi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
