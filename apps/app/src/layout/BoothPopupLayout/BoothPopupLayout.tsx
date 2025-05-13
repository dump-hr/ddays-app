import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import styles from './BoothPopupLayout.module.scss';

interface BoothPopupLayoutProps {
  closePopup: () => void;
  isOpen: boolean;
}

const BoothPopupLayout = ({
  children,
  closePopup,
  isOpen,
}: PropsWithChildren<BoothPopupLayoutProps>) => {
  return (
    <div className={clsx(styles.wrapper, { [styles.closed]: !isOpen })}>
      <div onClick={closePopup} className={styles.closeOverlay} />
      <div className={styles.container}>
        <button onClick={closePopup}>close</button>
        {children}
      </div>
    </div>
  );
};

export default BoothPopupLayout;
