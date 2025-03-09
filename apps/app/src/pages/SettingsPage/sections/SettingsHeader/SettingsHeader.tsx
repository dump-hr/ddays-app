import clsx from 'clsx';
import styles from './SettingsHeader.module.scss';
import { RouteNames } from '../../../../router/routes';

import { useNavigate } from 'react-router-dom';
import { useDeviceType } from '../../../../hooks/UseDeviceType';
import { useUserContext } from '../../../../context/UserContext';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import ArrowLeftWhiteIcon from '@/assets/icons/arrow-left-white.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import EditIcon from '@/assets/icons/pencil.svg';

interface SettingsHeaderProps {
  isEditing: boolean;
  isChangingPassword: boolean;
  setIsEditing: (value: boolean) => void;
  setIsChangingPassword: (value: boolean) => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  isEditing,
  isChangingPassword,
  setIsEditing,
  setIsChangingPassword,
}) => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceType({ breakpoint: 768 });
  const { userData, updateUserSettingsData } = useUserContext();

  const handleEditClick = () => {
    if (isChangingPassword) {
      setIsChangingPassword(false);
      updateUserSettingsData({
        password: '',
        newPassword: '',
        repeatedPassword: '',
      });
      return;
    }
    if (isEditing) updateUserSettingsData(userData);
    setIsEditing(!isEditing);
  };

  const handleBackClickMobile = () => {
    navigate(RouteNames.PROFILE);
  };

  const handleBackClick = () => {
    if (isEditing || isChangingPassword) {
      setIsEditing(false);
      setIsChangingPassword(false);
      return;
    }
    navigate(RouteNames.PROFILE);
  };

  const setHeaderTitle = () => {
    if (isEditing) return 'Uredi profil';
    if (isChangingPassword) return 'Promjena lozinke';
    return 'Postavke profila';
  };

  return (
    <div
      className={clsx(
        styles.settingsHeader,
        (isEditing || isChangingPassword) && styles.settingsHeaderEdit,
      )}>
      {!isEditing && !isChangingPassword && isMobile && (
        <div className={styles.backButton} onClick={handleBackClickMobile}>
          <img src={ArrowLeftIcon} alt='back' />
        </div>
      )}
      {!isMobile && (
        <div className={styles.backButtonDesktop} onClick={handleBackClick}>
          <img src={ArrowLeftWhiteIcon} alt='back' />
        </div>
      )}
      <h1>{setHeaderTitle()}</h1>
      <div
        onClick={handleEditClick}
        className={clsx(
          isMobile && styles.editButton,
          !isMobile && styles.editButtonDesktop,
          !isMobile && (isEditing || isChangingPassword) && styles.displayNone,
          (isEditing || isChangingPassword) && styles.noBackground,
        )}>
        {!isEditing && !isChangingPassword && (
          <>
            <img src={EditIcon} alt='edit' />
            {!isMobile && <span>UREDI SVOJE INTERESE</span>}
          </>
        )}
        {(isEditing || isChangingPassword) && isMobile && (
          <img src={CloseIcon} alt='close' />
        )}
      </div>
    </div>
  );
};
