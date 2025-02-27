import { useDeviceType } from '../../../hooks/UseDeviceType';
import c from './SlavicaHeader.module.scss';
import MobileSlavica from '@/assets/images/confirm-email-slavica-mobile.png';
import DesktopSlavica from '@/assets/images/confirm-email-slavicia-desktop.png';
import CloseIcon from '@/assets/icons/remove-icon.svg';
import { useNavigate } from 'react-router-dom';

export const SlavicaHeader = () => {
  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();
  return (
    <div className={c.slavicaHeader}>
      {!isMobile && (
        <img
          src={CloseIcon}
          className={c.closeIcon}
          onClick={() => navigate('/app')}></img>
      )}
      <h1>REGISTRACIJA</h1>
      <img
        src={isMobile ? MobileSlavica : DesktopSlavica}
        alt='patkica Slavica'></img>
    </div>
  );
};
