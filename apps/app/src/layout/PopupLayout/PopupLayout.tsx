import { PropsWithChildren } from 'react';
import styles from './PopupLayout.module.scss';
import CloseIcon from '@/assets/icons/close-icon.svg';
import clsx from 'clsx';

interface PopupLayoutProps {
  imgSrc?: string;
  headerTitle: string;
  closePopup: () => void;
  isOpen: boolean;
}

const PopupLayout = ({
  children,
  headerTitle,
  imgSrc,
  closePopup,
  isOpen,
}: PropsWithChildren<PopupLayoutProps>) => {
  return (
    <div className={clsx(styles.wrapper, { [styles.closed]: !isOpen })}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>{headerTitle}</h2>
          <img
            src={CloseIcon}
            onClick={closePopup}
            className={styles.closeIcon}
            alt=''
          />
        </div>
        <div className={styles.popupImageContainer}>
          <img className={styles.popupImage} src={imgSrc} />
        </div>
        <div className={styles.contentDiv}>{children}</div>
      </div>
    </div>
  );
};

export default PopupLayout;
