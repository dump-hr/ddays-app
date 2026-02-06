import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoothPopup.module.scss';
import { FloorPlanCompanyDto, RatingDto } from '@ddays-app/types';
import InfoLightIcon from '@/assets/icons/info-light.svg';
import CloseIcon from '@/assets/icons/remove-icon.svg';
import { isBoothRated } from '@/helpers/isBoothRated';
import { RouteNames } from '@/router/routes';
import Button from '@/components/Button';

type BoothPopupProps = {
  closePopup: () => void;
  isOpen: boolean;
  companyInfo: FloorPlanCompanyDto;
  availableBooths?: FloorPlanCompanyDto[];
  userRatings?: RatingDto[];
};

const BoothPopup = ({
  closePopup,
  isOpen,
  companyInfo,
  availableBooths,
  userRatings,
}: PropsWithChildren<BoothPopupProps>) => {
  const navigate = useNavigate();
  const isRated = isBoothRated(companyInfo.booth, availableBooths, userRatings);

  return (
    <div className={clsx(styles.wrapper, { [styles.closed]: !isOpen })}>
      <div className={styles.closePopup} onClick={closePopup} />
      <div className={styles.container}>
        <div
          className={clsx({
            [styles.logoHeader]: true,
            [styles.rated]: isRated,
          })}>
          <img src={companyInfo.logoImage} className={styles.logo} />
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
                Ocjena:{' '}
                <span>{Math.round(companyInfo.boothRating * 10) / 10}/5</span>
              </p>
            ) : (
              <p className={styles.rating}>Nema ocjene!</p>
            )}
          </div>
          <div className={styles.interestsTitleRow}>
            <p className={styles.interestsTitle}>Interesi</p>
            <div className={styles.dottedBreak} />
          </div>
          {companyInfo.interests && (
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
          )}

          {!isRated && (
            <>
              <div className={styles.infoMessage}>
                <img className={styles.icon} src={InfoLightIcon} />
                <p className={styles.message}>
                  Nakon što posjetiš štand, možeš ga ocijeniti i osvojiti
                  dodatne bodove!
                </p>
              </div>
              <Button
                variant="orange"
                className={styles.rateButton}
                onClick={() => {
                  closePopup();
                  navigate(
                    RouteNames.RATE_COMPANY.replace(
                      ':companyId',
                      String((companyInfo as unknown as { id: number }).id),
                    ),
                  );
                }}>
                Ocijeni štand
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoothPopup;
