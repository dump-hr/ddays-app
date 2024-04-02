import MobileApp from 'assets/images/mobile-app.png';

import c from './RegistrationSection.module.scss';

const RegistrationSection = () => {
  return (
    <div className={c.containerWrapper}>
      <h3>aplikacija</h3>
      <h1>registriraj se</h1>
      <img src={MobileApp} alt='mobile app' />
      <button>prijavi se u aplikaciju</button>
    </div>
  );
};

export default RegistrationSection;
