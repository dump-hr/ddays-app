import clsx from 'clsx';
import styles from './TransactionPopup.module.scss';
import CloseIcon from '@/assets/icons/close-icon.svg';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const TransactionPopup = ({ isOpen, closePopup }: PopupProps) => {
  return (
    <div className={clsx(styles.wrapper, { [styles.open]: isOpen })}>
      <div className={styles.container}>
        <img
          src={CloseIcon}
          onClick={closePopup}
          className={styles.closeIcon}
        />
      </div>
    </div>
  );
};

export default TransactionPopup;
