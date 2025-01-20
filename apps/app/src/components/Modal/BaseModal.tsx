import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import sprite from '../../assets/sprite.svg';
import styles from './Modal.module.scss';
import { useClickOutside } from '../../hooks/TempClickOutside';

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
  withOverlay = true,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      setShouldRender(true);
      timeoutId = setTimeout(() => {
        setAnimationClass(styles.opening);
      }, 10);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  useClickOutside(modalRef, handleClose);

  return (
    shouldRender && (
      <>
        {withOverlay && (
          <div
            className={`${styles.backgroundOverlay} ${animationClass}`}
            onClick={handleClose}
          />
        )}
        <div
          ref={modalRef}
          className={`${styles.modalContainer} ${animationClass}`}>
          <div className={styles.modalHeaderWrapper}>
            <p className={styles.modalTitle}>{title}</p>
            <div onClick={handleClose}>
              <svg className={styles.modalCloseIcon} width={22} height={22}>
                <use href={`${sprite}#close-icon`} />
              </svg>
            </div>
          </div>
          {children}
        </div>
      </>
    )
  );
};
