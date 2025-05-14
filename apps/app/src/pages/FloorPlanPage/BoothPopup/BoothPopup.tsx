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
      <div className={styles.container}>
        <div
          className={clsx({
            [styles.logoHeader]: true,
            [styles.rated]: isRated,
          })}>
          <img src={ProficoLogo} className={styles.logo} />
        </div>
        <div className={styles.content}>
          <div className={styles.ratingRow}>
            <p className={styles.companyName}>{companyInfo.name}</p>
            {isRated ? (
              <p className={clsx(styles.rating, styles.rated)}>
                Ocjena: <span>{companyInfo.rating}/10</span>
              </p>
            ) : (
              <p className={styles.rating}>Nema ocjene!</p>
            )}
          </div>
          <div className={styles.interestsTitleRow}>
            <p className={styles.interestsTitle}>Interesi</p>
            <div className={styles.dottedBreak} />
          </div>
          <div className={styles.interestsContainer}>
            {companyInfo.interests.map((interest) => (
              <div
                key={interest.id}
                className={clsx({
                  [styles.interest]: true,
                  [styles.rated]: isRated,
                })}>
                {interest.name}
              </div>
            ))}
          </div>
          <button onClick={closePopup}>close</button>
          {children} {isRated && 'rated'}
        </div>
      </div>
    </div>
  );
};

export default BoothPopup;
