import { ReactNode } from 'react';
import sprite from '../../assets/sprite.svg';
import styles from './Modal.module.scss';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  withOverlay?: boolean;
  children: ReactNode;
};

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  withOverlay = false,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      {withOverlay && <div className={styles.backgroundOverlay} />}
      <div className={styles.modalHeaderWrapper}>
        <p className={styles.modalTitle}>{title}</p>
        <div onClick={() => onClose()}>
          <svg className={styles.modalCloseIcon} width={22} height={22}>
            <use href={`${sprite}#close-icon`} />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
};
