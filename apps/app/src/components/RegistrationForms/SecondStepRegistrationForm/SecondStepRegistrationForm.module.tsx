import { ChangeEvent, useEffect, useState } from 'react';
import c from './SecondStepRegistrationForm.module.scss';
import { Input } from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownOption } from '../../Dropdown/DropdownOption';
import { validateField, validations } from '../../../helpers/validateInput';
import { RegistrationFormErrors } from '../../../types/errors/errors.dto';

type UserData = {
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
};

type Props = {
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
  isSubmitted: boolean;
};

export const SecondStepRegistrationForm = ({
  userData,
  updateUserData,
  isSubmitted,
}: Props) => {
  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const formattedPhoneNumber = validations.formatPhoneNumber(value);
      updateUserData({ [name]: formattedPhoneNumber });
    } else {
      updateUserData({
        [name]: name === 'birthYear' ? parseInt(value) || null : value,
      });
    }
  };

  const handleDropdownChange = (
    field: 'educationDegree' | 'occupation',
    selectedOption: DropdownOption,
  ) => {
    updateUserData({
      [field]: selectedOption.value,
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      const newErrors: RegistrationFormErrors = {};

      const fieldsToValidate: (keyof UserData)[] = [
        'phoneNumber',
        'birthYear',
        'educationDegree',
        'occupation',
      ];

      fieldsToValidate.forEach((field) => {
        const error = validateField(field, userData[field], userData);
        if (error) {
          newErrors[field] = error;
        }
      });

      setErrors(newErrors);
    }
  }, [isSubmitted, userData]);

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
          error={errors.phoneNumber}
        />

        <Input
          name='birthYear'
          value={userData.birthYear?.toString() || ''}
          placeholder='Godina rođenja'
          onChange={handleInputChange}
          error={errors.birthYear}
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
          errorLabel={errors.educationDegree}
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
          errorLabel={errors.occupation}
        />
      </div>
    </>
  );
};
