import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import NotificationsSection from '@/components/NotificationsSection';
import styles from './DesktopNotificationsPopup.module.scss';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const DesktopNotificationsPopup = ({ isOpen, closePopup }: PopupProps) => {
  return (
    <PopupLayout
      variant='light'
      headerTitleComponent={<>Notifikacije</>}
      closePopup={() => closePopup()}
      isOpen={isOpen}
      desktopStyle='normal'>
      <div className={styles.contentDiv}>
        <NotificationsSection />
      </div>
    </PopupLayout>
  );
};

export default DesktopNotificationsPopup;
