import { useState } from 'react';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import NotificationsSection from '@/components/NotificationsSection';

const DesktopNotificationsPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  return (
    <PopupLayout
      variant='light'
      headerTitleComponent={<>Unesi kod</>}
      closePopup={() => setIsPopupOpen(false)}
      isOpen={isPopupOpen}
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
