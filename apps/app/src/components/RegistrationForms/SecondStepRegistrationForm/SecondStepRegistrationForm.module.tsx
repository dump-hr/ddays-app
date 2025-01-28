import { ChangeEvent, useState } from 'react';
import c from './SecondStepRegistrationForm.module.scss';
import { Input } from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownOption } from '../../Dropdown/DropdownOption';

type UserData = {
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: number | null;
  occupation: string;
};
export const SecondStepRegistrationForm = () => {
  const [userData, setUserData] = useState<UserData>({
    phoneNumber: '',
    birthYear: null,
    educationDegree: null,
    occupation: '',
  });
  const [educationDegreeOption, setEducationDegreeOption] =
    useState<DropdownOption>();
  const [occupationOption, setOccupationOption] = useState<DropdownOption>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const educationDegreeOptions: DropdownOption[] = [
    {
      value: 'A',
      label: 'A',
    },
    {
      value: 'b',
      label: 'b',
    },
    {
      value: 'cc',
      label: 'cc',
    },
  ];

  const occupationOptions: DropdownOption[] = [
    {
      value: 'eefe',
      label: 'eefe',
    },
    {
      value: 'eee',
      label: 'eee',
    },
    {
      value: 'ee',
      label: 'ee',
    },
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
          value={
            userData.birthYear?.toString() ? userData.birthYear.toString() : ''
          }
          placeholder='Godina rođenja'
          onChange={handleInputChange}
        />

        <Dropdown
          label='Stupanj obrazovanja'
          placeholder='Izaberi'
          options={educationDegreeOptions}
          setOption={(selectedOption) =>
            setEducationDegreeOption(selectedOption)
          }
          selectedOption={educationDegreeOption}
        />

        <Dropdown
          label='Trenutna okupacija'
          placeholder='Izaberi'
          options={occupationOptions}
          setOption={(selectedOption) => setOccupationOption(selectedOption)}
          selectedOption={occupationOption}
        />
      </div>
    </>
  );
};
