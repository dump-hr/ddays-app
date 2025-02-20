import Logout from '../../assets/icons/logout.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';

import c from './LogoutButton.module.scss';

const LogoutButton = () => {
  return (
    <button className={c.button}>
      <div className={c.iconWrapper}>
        <img src={Logout} className={c.icon} />
      </div>
      Odjava
      <img src={ArrowRight} className={c.arrow} />
    </button>
  );
};

export default LogoutButton;
