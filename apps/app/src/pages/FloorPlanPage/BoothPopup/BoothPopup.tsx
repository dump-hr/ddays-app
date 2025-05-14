import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import styles from './BoothPopup.module.scss';
import { InterestDto } from '@ddays-app/types';
import ProficoLogo from '@/assets/images/Profico.svg';

type CompanyInfo = {
  name: string;
  logoUrl: string;
  rating?: number;
  interests: InterestDto[];
};

type BoothPopupProps = {
  closePopup: () => void;
  isOpen: boolean;
  companyInfo: CompanyInfo;
};

const BoothPopup = ({
  children,
  closePopup,
  isOpen,
  companyInfo,
}: PropsWithChildren<BoothPopupProps>) => {
  const isRated =
    companyInfo.rating !== undefined && companyInfo.rating !== null;

  return (
    <div className={clsx(styles.wrapper, { [styles.closed]: !isOpen })}>
      <div onClick={closePopup} className={styles.closeOverlay} />
      <div className={styles.container}>
        <div className={styles.logoHeader}>
          <img src={ProficoLogo} className={styles.logo} />
        </div>
        <button onClick={closePopup}>close</button>
        {children} {isRated && 'rated'}
      </div>
    </div>
  );
};

export default BoothPopup;
