import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import styles from './BoothPopup.module.scss';
import { InterestDto } from '@ddays-app/types';
import ProficoLogo from '@/assets/images/Profico.svg';
import InfoLightIcon from '@/assets/icons/info-light.svg';
import CloseIcon from '@/assets/icons/remove-icon.svg';

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
  closePopup,
  isOpen,
  companyInfo,
}: PropsWithChildren<BoothPopupProps>) => {
  const isRated =
    companyInfo.rating !== undefined && companyInfo.rating !== null;

  return (
    <div className={clsx(styles.wrapper, { [styles.closed]: !isOpen })}>
      <div className={styles.closePopup} onClick={closePopup} />
      <div className={styles.container}>
        <div
          className={clsx({
            [styles.logoHeader]: true,
            [styles.rated]: isRated,
          })}>
          <img src={ProficoLogo} className={styles.logo} />
          <img
            src={CloseIcon}
            className={styles.closeIcon}
            onClick={closePopup}
          />
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
          {!isRated && (
            <div className={styles.infoMessage}>
              <img className={styles.icon} src={InfoLightIcon} />
              <p className={styles.message}>
                Nakon što posjetiš štand, možeš ga ocijeniti i osvojiti dodatne
                bodove!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoothPopup;
