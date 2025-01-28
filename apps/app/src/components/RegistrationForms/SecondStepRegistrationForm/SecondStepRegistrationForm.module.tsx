import { ChangeEvent } from 'react';
import c from './SecondStepRegistrationForm.module.scss';
import { Input } from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownOption } from '../../Dropdown/DropdownOption';

type UserData = {
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
};

type Props = {
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
};

export const SecondStepRegistrationForm = ({
  userData,
  updateUserData,
}: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserData({
      [name]: name === 'birthYear' ? parseInt(value) || null : value,
    });
  };

  const handleDropdownChange = (
    field: 'educationDegree' | 'occupation',
    selectedOption: DropdownOption,
  ) => {
    updateUserData({
      [field]: selectedOption.value,
    });
  };

  const educationDegreeOptions: DropdownOption[] = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
  ];

  const occupationOptions: DropdownOption[] = [
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
  ];

  return (
    <>
      <div className={c.inputFieldsWrapper}>
        <Input
          name='phoneNumber'
          value={userData.phoneNumber}
          placeholder='Broj mobitela'
          onChange={handleInputChange}
        />

        <Input
          name='birthYear'
          value={userData.birthYear?.toString() || ''}
          placeholder='Godina rođenja'
          onChange={handleInputChange}
        />

        <Dropdown
          label='Stupanj obrazovanja'
          placeholder='Izaberi'
          options={educationDegreeOptions}
          setOption={(selectedOption) =>
            handleDropdownChange('educationDegree', selectedOption)
          }
          selectedOption={educationDegreeOptions.find(
            (option) => option.value === userData.educationDegree,
          )}
        />

        <Dropdown
          label='Trenutna okupacija'
          placeholder='Izaberi'
          options={occupationOptions}
          setOption={(selectedOption) =>
            handleDropdownChange('occupation', selectedOption)
          }
          selectedOption={occupationOptions.find(
            (option) => option.value === userData.occupation,
          )}
        />
      </div>
    </>
  );
};
