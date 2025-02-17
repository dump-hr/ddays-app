import { useDeviceType } from '../../../hooks/UseDeviceType';
import c from './SlavicaHeader.module.scss';
import mobileSlavica from './../../../assets/images/confirm-email-slavica-mobile.png';
import desktopSlavica from './../../../assets/images/confirm-email-slavica-desktop.png';

export const SlavicaHeader = () => {
  const { isMobile } = useDeviceType({});
  return (
    <div className={c.slavicaHeader}>
      <h1>Registracija</h1>
      {isMobile ? (
        <img src={mobileSlavica}></img>
      ) : (
        <img src={desktopSlavica}></img>
      )}
    </div>
  );
};
