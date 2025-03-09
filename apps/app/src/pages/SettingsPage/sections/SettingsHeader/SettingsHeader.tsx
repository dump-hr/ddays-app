import clsx from 'clsx';
import styles from '../../SettingsPage.module.scss';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
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
  const handleEditClick = () => {
    if (isChangingPassword) {
      setIsChangingPassword(false);
      return;
    }
    setIsEditing(!isEditing);
  };

  const setHeaderTitle = () => {
    if (isEditing) {
      return 'UREDI PROFIL';
    } else if (isChangingPassword) {
      return 'PROMJENA LOZINKE';
    } else {
      return 'POSTAVKE PROFILA';
    }
  };

  return (
    <div
      className={clsx(
        styles.settingsHeader,
        (isEditing || isChangingPassword) && styles.settingsHeaderEdit,
      )}>
      {!isEditing && !isChangingPassword && (
        <div className={styles.backButton}>
          <img src={ArrowLeftIcon} alt='back' />
        </div>
      )}
      <h1>{setHeaderTitle()}</h1>
      <div
        onClick={handleEditClick}
        className={clsx(
          styles.editButton,
          (isEditing || isChangingPassword) && styles.noBackground,
        )}>
        <img
          src={!isEditing && !isChangingPassword ? EditIcon : CloseIcon}
          alt='edit'
        />
      </div>
    </div>
  );
};
