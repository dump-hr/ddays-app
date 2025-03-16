import { ReactNode } from 'react';
import styles from './PopupLayout.module.scss';

interface PopupLayoutProps {
  children: ReactNode;
}

const PopupLayout = ({ children }: PopupLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>{children}</div>
      </div>
    </div>
  );
};

export default PopupLayout;
