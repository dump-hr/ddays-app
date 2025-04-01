import c from './RateCompanyPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import { RouteNames } from '../../router/routes';
import HRCloudLogo from '../../assets/images/HRCloud.svg';

export const RateCompanyPage = () => {
  return (
    <div>
      <div className={c.wrapper}>
        <div className={c.pageName}>
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
            <text className={c.companyLocationAtConference}>Z4</text>
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
