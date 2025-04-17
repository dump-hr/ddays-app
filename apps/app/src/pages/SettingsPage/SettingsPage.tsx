import { useState, useEffect } from 'react';
import styles from './SettingsPage.module.scss';

import LockIcon from '@/assets/icons/lock-icon.svg';
import ThrashIcon from '@/assets/icons/delete-icon.svg';

import { SettingsButton } from '@/components/SettingsButton';
import { EditProfileSection } from './sections/EditProfileSection';
import { ChangePassword } from './sections/ChangePassword';
import { SettingsHeader } from './sections/SettingsHeader';
import { RegistrationProvider } from '@/context/RegistrationContext';
import DeleteAccountPopup from './popups/DeleteAccountPopup';

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] =
    useState(false);

  const handleDeleteAccount = () => {
    // TODO: otvaranje popupa kada bude spremno i api poziv
    setIsDeleteAccountPopupOpen(true);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) body.scrollTo(0, 0);
  }, [isChangingPassword]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.settingsWrapper}>
        <div className={styles.settingsContainer}>
          <RegistrationProvider>
            <SettingsHeader
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isChangingPassword={isChangingPassword}
              setIsChangingPassword={setIsChangingPassword}
            />
            <div className={styles.settingsContent}>
              {!isChangingPassword ? (
                <EditProfileSection
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              ) : (
                <ChangePassword setIsChangingPassword={setIsChangingPassword} />
              )}

              {!isEditing && !isChangingPassword && (
                <div className={styles.settingsButtonsContainer}>
                  <SettingsButton
                    icon={LockIcon}
                    variant={'grey'}
                    onClick={() => {
                      setIsChangingPassword(true);
                    }}>
                    Promjeni lozinku
                  </SettingsButton>
                  <SettingsButton
                    icon={ThrashIcon}
                    variant={'red'}
                    onClick={() => handleDeleteAccount()}>
                    Obriši račun
                  </SettingsButton>
                </div>
              )}
            </div>
            <DeleteAccountPopup
              isOpen={isDeleteAccountPopupOpen}
              setIsOpen={setIsDeleteAccountPopupOpen}
            />
          </RegistrationProvider>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
