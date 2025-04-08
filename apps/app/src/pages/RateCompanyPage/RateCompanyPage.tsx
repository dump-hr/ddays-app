import c from './RateCompanyPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import HRCloudLogo from '../../assets/images/HRCloud.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import RatingQuestion from '../../components/RatingQuestion';

export const RateCompanyPage = () => {
  return (
    <div>
      <div className={c.wrapper}>
        <div className={c.page}>
          <Link to={RouteNames.HOME}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
        </div>
        <div className={c.container}>
          <div className={c.titleContainer}>
            <h1 className={c.title}>Ocjeni sponzorski štand</h1>
            <Link to={RouteNames.HOME}>
              <img src={closeIcon} alt='Close login' className={c.closeIcon} />
            </Link>
          </div>
          <div className={c.companyDetails}>
            <img src={HRCloudLogo} alt='Company logo' className={c.logo} />
            <p className={c.companyLocationAtConference}>Z4</p>
          </div>
          <div className={c.breakline}></div>
          <div className={c.ratingContainer}>
            <RatingQuestion
              title='Generalni dojam štanda'
              text='Kakav je dojam štand ostavio na tebe?'
            />
            <RatingQuestion
              title='Sadržaj štanda'
              text='Što se sve nudi? Je li ti bilo zabavno?'
            />
            <RatingQuestion
              title='Izlagači'
              text='Ocijeni svoj dojam o izlagačima.'
            />
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
