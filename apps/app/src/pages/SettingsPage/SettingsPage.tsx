import clsx from 'clsx';
import { useState } from 'react';
import styles from './SettingsPage.module.scss';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import EditIcon from '@/assets/icons/pencil.svg';

import Dropdown from '../../components/Dropdown';
import { Input } from '../../components/Input';
import { textInputs, dropdownInputs } from './inputs';
import { useUserContext } from '../../context/UserContext';
import { useInputHandlers } from '../../hooks/useInputHandlers';

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const { userData, setUserData: updateUserData } = useUserContext();
  const { handleDropdownChange, handleInputChange } =
    useInputHandlers(updateUserData);

  return (
    <div className={styles.wrapper}>
      <div className={styles.settingsWrapper}>
        <div className={styles.settingsContainer}>
          <div
            className={clsx(
              styles.settingsHeader,
              isEditing && styles.settingsHeaderEdit,
            )}>
            {!isEditing && (
              <div className={styles.backButton}>
                <img src={ArrowLeftIcon} alt='back' />
              </div>
            )}
            <h1>{isEditing ? 'UREDI PROFIL' : 'POSTAVKE PROFILA'}</h1>
            <div
              onClick={handleEditClick}
              className={clsx(
                styles.editButton,
                isEditing && styles.noBackground,
              )}>
              <img src={!isEditing ? EditIcon : CloseIcon} alt='edit' />
            </div>
          </div>
          <div className={styles.settingsContent}>
            {textInputs.map((input) => {
              return (
                <Input
                  name={input.name}
                  disabled={!isEditing}
                  type={input.type}
                  value={userData[input.name]?.toString()}
                  placeholder={input.placeholder}
                  onChange={handleInputChange}
                />
              );
            })}

            {dropdownInputs.map((input) => {
              if (isEditing) {
                return (
                  <Dropdown
                    name={input.name}
                    label={input.placeholder}
                    placeholder={'Odaberite'}
                    options={input.options}
                    setOption={(selectedOption) =>
                      handleDropdownChange(input.name, selectedOption)
                    }
                    selectedOption={input.options.find(
                      (option) => option.value === userData[input.name],
                    )}
                  />
                );
              }

              return (
                <Input
                  name={input.name}
                  disabled={!isEditing}
                  value={userData[input.name]?.toString()}
                  placeholder={input.placeholder}
                  onChange={() => {}}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
