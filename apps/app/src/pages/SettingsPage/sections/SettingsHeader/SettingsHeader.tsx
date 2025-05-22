import clsx from 'clsx';
import toast from 'react-hot-toast';
import styles from './SettingsHeader.module.scss';
import { RouteNames } from '@/router/routes';

import { useNavigate } from 'react-router-dom';
import { useDeviceType } from '@/hooks/UseDeviceType';
import { useUserContext } from '@/context/UserContext';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import ArrowLeftWhiteIcon from '@/assets/icons/arrow-left-white.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import EditIcon from '@/assets/icons/pencil.svg';

export const SettingsHeader: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceType({ breakpoint: 768 });
  const {
    userSettingsData,
    updateUserSettingsData,
    updatePasswordInputsData,
    isEditing,
    isChangingPassword,
    setIsChangingPassword,
    setIsEditing,
  } = useUserContext();

  const isEditingMode = isEditing || isChangingPassword;
  const isNotEditingMode = !isEditing && !isChangingPassword;

  const handleEditClick = () => {
    if (isChangingPassword) {
      setIsChangingPassword(false);
      updatePasswordInputsData({
        password: '',
        newPassword: '',
        repeatedPassword: '',
      });
      toast('Izmjene nisu spremljene!', { icon: '⚠️' });
      return;
    }

    if (isEditing) {
      updateUserSettingsData(userSettingsData);
      toast('Izmjene nisu spremljene!', { icon: '⚠️' });
    }
    setIsEditing(!isEditing);
  };

  const handleBackClick = () => {
    if (isMobile) {
      navigate(RouteNames.PROFILE);
      return;
    }

    if (isEditingMode) {
      setIsEditing(false);
      setIsChangingPassword(false);
      updateUserSettingsData(userSettingsData);
      toast('Izmjene nisu spremljene!', { icon: '⚠️' });
      return;
    }
    navigate(RouteNames.PROFILE);
  };

  const getHeaderTitle = () => {
    if (isEditing) return 'Uredi profil';
    if (isChangingPassword) return 'Promjena lozinke';
    return 'Postavke profila';
  };

  return (
    <div
      className={clsx(
        styles.settingsHeader,
        isEditingMode && styles.settingsHeaderEdit,
      )}>
      {isNotEditingMode && isMobile && (
        <div className={styles.backButton} onClick={handleBackClick}>
          <img src={ArrowLeftIcon} alt='back' />
        </div>
      )}
      {!isMobile && (
        <div className={styles.backButtonDesktop} onClick={handleBackClick}>
          <img src={ArrowLeftWhiteIcon} alt='back' />
        </div>
      )}
      <h1>{getHeaderTitle()}</h1>
      <div
        onClick={handleEditClick}
        className={clsx(
          isMobile && styles.editButton,
          !isMobile && styles.editButtonDesktop,
          !isMobile && isEditingMode && styles.displayNone,
          isEditingMode && styles.noBackground,
        )}>
        {isNotEditingMode && (
          <>
            <img src={EditIcon} alt='edit' />
            {!isMobile && <span>UREDI SVOJ PROFIL</span>}
          </>
        )}
        {isEditingMode && isMobile && <img src={CloseIcon} alt='close' />}
      </div>
    </div>
  );
};
