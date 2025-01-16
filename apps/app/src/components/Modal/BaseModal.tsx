import { ReactNode, useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {withOverlay && (
        <div className={styles.backgroundOverlay} onClick={onClose} />
      )}
      <div ref={modalRef} className={styles.modalContainer}>
        <div className={styles.modalHeaderWrapper}>
          <p className={styles.modalTitle}>{title}</p>
          <div onClick={onClose}>
            <svg className={styles.modalCloseIcon} width={22} height={22}>
              <use href={`${sprite}#close-icon`} />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
