import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import styles from './BoothPopupLayout.module.scss';
import { InterestDto } from '@ddays-app/types';

type CompanyInfo = {
  name: string;
  logoUrl: string;
  rating?: number;
  interests: InterestDto[];
};

interface BoothPopupLayoutProps {
  closePopup: () => void;
  isOpen: boolean;
  companyInfo: CompanyInfo;
}

const BoothPopupLayout = ({
  children,
  closePopup,
  isOpen,
  companyInfo,
}: PropsWithChildren<BoothPopupLayoutProps>) => {
  const isRated =
    companyInfo.rating !== undefined && companyInfo.rating !== null;

  return (
    <div className={clsx(styles.wrapper, { [styles.closed]: !isOpen })}>
      <div onClick={closePopup} className={styles.closeOverlay} />
      <div className={styles.container}>
        <button onClick={closePopup}>close</button>
        {children} {isRated && 'rated'}
      </div>
    </div>
  );
};

export default BoothPopupLayout;
