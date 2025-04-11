import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import NotificationsSection from '@/components/NotificationsSection';

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
      <div
        style={{
          overflowY: 'auto',
          paddingRight: '0.5rem',
        }}>
        {' '}
        <NotificationsSection />
      </div>
    </PopupLayout>
  );
};

export default DesktopNotificationsPopup;
