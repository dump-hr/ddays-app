import { useDeviceType } from '../../../hooks/UseDeviceType';
import c from './SlavicaHeader.module.scss';
import mobileSlavica from './../../../assets/images/confirm-email-slavica-mobile.png';
import desktopSlavica from './../../../assets/images/confirm-email-slavicia-desktop.png';
import closeIcon from './../../../assets/icons/remove-icon.svg';

export const SlavicaHeader = () => {
  const { isMobile } = useDeviceType({});
  return (
    <div className={c.slavicaHeader}>
      {!isMobile && <img src={closeIcon} className={c.closeIcon}></img>}
      <h1>REGISTRACIJA</h1>
      {isMobile ? (
        <img src={mobileSlavica}></img>
      ) : (
        <img src={desktopSlavica}></img>
      )}
    </div>
  );
};
