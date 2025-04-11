import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';
import styles from './PopupLayout.module.scss';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { useDeviceType } from '@/hooks/UseDeviceType';

interface PopupLayoutProps {
  headerTitleComponent: ReactNode;
  variant: 'light' | 'dark';
  closePopup: () => void;
  isOpen: boolean;
  imgSrc?: string;
  justifyContent?: 'center' | 'start' | 'end' | 'space-between';
  desktopStyle?: 'normal' | 'stretch';
  opacity?: number;
}

const PopupLayout = ({
  children,
  headerTitleComponent,
  variant,
  closePopup,
  isOpen,
  imgSrc = '',
  justifyContent = 'start',
  desktopStyle = 'normal',
  opacity = 0.5,
}: PropsWithChildren<PopupLayoutProps>) => {
  const { isMobile } = useDeviceType({ breakpoint: 768 });

  return (
    <div
      style={{ backgroundColor: `rgba(23, 22, 21, ${opacity})` }}
      className={clsx(
        styles.wrapper,
        { [styles.closed]: !isOpen },
        { [styles.alignItemsEnd]: desktopStyle === 'stretch' },
      )}>
      {desktopStyle === 'stretch' && (
        <img
          src={CloseIcon}
          onClick={closePopup}
          className={styles.closeIconDesktop}
          alt='close'
        />
      )}
      <div
        className={clsx(
          styles.container,
          { [styles.desktopStretch]: desktopStyle === 'stretch' },
          { [styles.desktopNormal]: desktopStyle === 'normal' },
          { [styles.dark]: variant === 'dark' },
          { [styles.light]: variant === 'light' },
          { [styles.center]: justifyContent === 'center' },
          { [styles.start]: justifyContent === 'start' },
          { [styles.end]: justifyContent === 'end' },
          { [styles.between]: justifyContent === 'space-between' },
        )}>
        <div
          className={clsx(styles.heading, {
            [styles.center]: desktopStyle === 'stretch' && !isMobile,
          })}>
          <h2 className={styles.headingTitle}>{headerTitleComponent}</h2>
          {(isMobile || desktopStyle === 'normal') && (
            <img
              src={CloseIcon}
              onClick={closePopup}
              className={styles.closeIcon}
              alt='close'
            />
          )}
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
