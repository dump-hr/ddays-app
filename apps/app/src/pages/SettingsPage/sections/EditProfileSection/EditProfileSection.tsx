import toast from 'react-hot-toast';
import styles from './EditProfileSection.module.scss';
import { useUserContext } from '../../../../context/UserContext';
import { useInputHandlers } from '../../../../hooks/useInputHandlers';
import { checkboxInputs, dropdownInputs, textInputs } from './inputs';

import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import { Checkbox } from '../../../../components/Checkbox';
import { Input } from '../../../../components/Input';

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

  const handleSaveClick = () => {
    setIsEditing(false);
    updateUserData(userSettingsData);
    toast.success('Podaci uspješno izmjenjeni!');
  };

  return (
    <>
      {textInputs.map((input) => {
        return (
          <Input
            name={input.name}
            disabled={!isEditing}
            type={input.type}
            value={userSettingsData[input.name]?.toString()}
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
                (option) => option.value === userSettingsData[input.name],
              )}
            />
          );
        }

        return (
          <Input
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
