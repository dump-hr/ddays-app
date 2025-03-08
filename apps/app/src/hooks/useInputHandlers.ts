import { ChangeEvent } from 'react';
import { DropdownOption } from '../components/Dropdown/DropdownOption';
import { UserDataFields } from '../types/enums';

export const useInputHandlers = (
  updateState: (data: Record<string, unknown>) => void,
) => {
  const handleDropdownChange = (
    field: UserDataFields,
    selectedOption: DropdownOption,
  ) => {
    updateState({
      [field]: selectedOption.value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState({
      [name as UserDataFields]: value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateState({ [name]: checked });
  };

  return { handleDropdownChange, handleInputChange, handleCheckboxChange };
};
