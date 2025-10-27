import MobileApp from 'assets/images/mobile-app.webp';

import Button from './../Button/Button';
import c from './RegistrationSection.module.scss';

const RegistrationSection = () => {
  return (
    <div className={c.containerWrapper}>
      <h3 className={c.applicationHeading}>APLIKACIJA</h3>
      <div className={c.registerContainer}>
        <h1 className={c.registerHeading}>registriraj se</h1>
        <img src={MobileApp} alt='mobile app' className={c.mobileAppImage} />
        <Button
          className={c.loginButton}
          onClick={() =>
            (window.location.href = 'https://2025-days.dump.hr/app/login')
          }>
          [ prijavi se u aplikaciju ]
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSection;
