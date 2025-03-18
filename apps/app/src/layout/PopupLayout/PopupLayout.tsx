import { PropsWithChildren } from 'react';
import styles from './PopupLayout.module.scss';
import CloseIcon from '@/assets/icons/close-icon.svg';
import clsx from 'clsx';

interface PopupLayoutProps {
  headerTitle: string;
  variant: 'light' | 'dark';
  closePopup: () => void;
  isOpen: boolean;
  imgSrc?: string;
  justifyContent?: 'center' | 'start' | 'end';
}

const PopupLayout = ({
  children,
  headerTitle,
  variant,
  closePopup,
  isOpen,
  imgSrc = '',
  justifyContent = 'start',
}: PropsWithChildren<PopupLayoutProps>) => {
  return (
    <div className={clsx(styles.wrapper, { [styles.closed]: !isOpen })}>
      <div
        className={clsx(
          styles.container,
          { [styles.dark]: variant === 'dark' },
          { [styles.light]: variant === 'light' },
          { [styles.center]: justifyContent === 'center' },
          { [styles.start]: justifyContent === 'start' },
          { [styles.end]: justifyContent === 'end' },
        )}>
        <div className={styles.heading}>
          <h2 className={styles.headingTitle}>{headerTitle}</h2>
          <img
            src={CloseIcon}
            onClick={closePopup}
            className={styles.closeIcon}
            alt='close'
          />
        </div>
        {imgSrc && (
          <div className={styles.popupImageContainer}>
            <img className={styles.popupImage} src={imgSrc} alt='popup' />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PopupLayout;
