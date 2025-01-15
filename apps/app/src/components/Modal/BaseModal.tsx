import { ReactNode } from 'react';
import sprite from '../../assets/sprite.svg';
import styles from './Modal.module.scss';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div></div>
      <div className={styles.modalHeaderWrapper}>
        <p className={styles.modalTitle}>{title}</p>
        <div onClick={() => onClose()}>
          <svg width={22} height={22}>
            <use href={`${sprite}#close-icon`} />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
};
