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
  const { userData, setUserData: updateUserData } = useUserContext();
  const { handleDropdownChange, handleInputChange, handleCheckboxChange } =
    useInputHandlers(updateUserData);

  return (
    <>
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
            disabled={true}
            name={input.name}
            value={userData[input.name]?.toString()}
            placeholder={input.placeholder}
            onChange={() => {}}
          />
        );
      })}

      {isEditing && (
        <>
          {checkboxInputs.map((input) => {
            return (
              <Checkbox
                name={input.name}
                checked={userData[input.name] as boolean}
                label={input.label}
                onChange={handleCheckboxChange}
              />
            );
          })}
          <Button variant='black' onClick={() => setIsEditing(false)}>
            SPREMI
          </Button>
        </>
      )}
    </>
  );
};
