import clsx from 'clsx';
import { useState } from 'react';
import styles from './SettingsPage.module.scss';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import EditIcon from '@/assets/icons/pencil.svg';

import { Input } from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import { textInputs, dropdownInputs } from './inputs';

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

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
                  disabled={!isEditing}
                  type={input.type}
                  value={''}
                  placeholder={input.placeholder}
                  onChange={() => {}}
                />
              );
            })}

            {dropdownInputs.map((input) => {
              if (isEditing) {
                return (
                  <Dropdown
                    label={input}
                    placeholder='Odaberite'
                    options={[
                      { value: 'Option 1', label: 'Option 1' },
                      { value: 'Option 2', label: 'Option 2' },
                    ]}
                    setOption={() => {}}
                    selectedOption={undefined}
                  />
                );
              }

              return (
                <Input
                  disabled={!isEditing}
                  value={'Mikejla'}
                  placeholder={input}
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
