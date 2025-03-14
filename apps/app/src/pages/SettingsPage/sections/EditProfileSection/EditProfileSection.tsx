import toast from 'react-hot-toast';
import styles from './EditProfileSection.module.scss';
import { useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useInputHandlers } from '@/hooks/useInputHandlers';
import {
  checkboxInputs,
  dropdownInputs,
  editProfileFields,
  textInputs,
} from './inputs';

import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { useRegistration } from '@/context/RegistrationContext';
import { SettingsEdits } from '@/types/enums';
import { validateField, allFieldsAreFilled } from '@/helpers/validateInput';
import { RegistrationFormErrors } from '@/types/errors/errors.dto';

interface EditProfileSectionProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const EditProfileSection: React.FC<EditProfileSectionProps> = ({
  isEditing,
  setIsEditing,
}) => {
  const { userSettingsData, updateUserSettingsData, updateUserData } =
    useUserContext();

  const { handleDropdownChange, handleInputChange, handleCheckboxChange } =
    useInputHandlers(updateUserSettingsData);

  const { errors, clearStepErrors, setStepErrors, isStepValid } =
    useRegistration();

  const validateEditProfile = () => {
    const newErrors: Partial<RegistrationFormErrors> = {};

    editProfileFields.forEach((key) => {
      const error = validateField(key, userSettingsData[key], userSettingsData);
      newErrors[key] = error || '';
    });

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(SettingsEdits.INFO, newErrors);
    } else {
      clearStepErrors(SettingsEdits.INFO);
    }
  };

  useEffect(() => {
    if (allFieldsAreFilled(editProfileFields, userSettingsData)) {
      validateEditProfile();
    }
  }, [userSettingsData]);

  const handleSaveClick = () => {
    if (allFieldsAreFilled(editProfileFields, userSettingsData)) {
      toast.error('Sva polja moraju biti popunjena!');
      return;
    }

    validateEditProfile();
    if (!isStepValid(SettingsEdits.INFO)) {
      toast.error('Podaci nisu ispravno uneseni!');
      return;
    }
    setIsEditing(false);
    updateUserData(userSettingsData);
    // TODO: api poziv za izmjenu podataka user-a
    toast.success('Podaci uspješno izmjenjeni!');
  };

  return (
    <>
      {textInputs.map((input) => {
        return (
          <Input
            key={input.name}
            name={input.name}
            disabled={!isEditing}
            type={input.type}
            value={userSettingsData[input.name]?.toString()}
            placeholder={input.placeholder}
            onChange={handleInputChange}
            error={errors[SettingsEdits.INFO]?.[input.name]}
          />
        );
      })}

      {dropdownInputs.map((input) => {
        if (isEditing) {
          return (
            <Dropdown
              key={input.name}
              name={input.name}
              label={input.placeholder}
              placeholder={'Odaberite'}
              options={input.options}
              setOption={(selectedOption) =>
                handleDropdownChange(input.name, selectedOption)
              }
              selectedOption={input.options.find(
                (option) => option.value === userSettingsData[input.name],
              )}
              hasError={errors[SettingsEdits.INFO]?.[input.name] !== ''}
            />
          );
        }

        return (
          <Input
            key={input.name}
            disabled={true}
            name={input.name}
            value={userSettingsData[input.name]?.toString()}
            placeholder={input.placeholder}
            onChange={() => {}}
          />
        );
      })}

      {isEditing && (
        <>
          <div className={styles.checkboxContainer}>
            {checkboxInputs.map((input) => {
              return (
                <Checkbox
                  key={input.name}
                  name={input.name}
                  checked={userSettingsData[input.name] as boolean}
                  label={input.label}
                  onChange={handleCheckboxChange}
                />
              );
            })}
          </div>
          <Button variant='black' onClick={handleSaveClick}>
            SPREMI
          </Button>
        </>
      )}
    </>
  );
};
