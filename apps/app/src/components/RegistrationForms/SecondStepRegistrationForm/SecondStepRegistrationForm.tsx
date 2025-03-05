import { ChangeEvent, useEffect } from 'react';
import c from './SecondStepRegistrationForm.module.scss';
import { Input } from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownOption } from '../../Dropdown/DropdownOption';
import { validateField, validations } from '../../../helpers/validateInput';
import { RegistrationFormErrors } from '../../../types/errors/errors.dto';
import { UserDataFields } from '../../../types/user/user.dto';
import { useRegistration } from '../../../providers/RegistrationContext';
import { CheckboxFieldsWrapper } from '../CheckboxFieldsWrapper';
import { RegistrationStep } from '../../../types/registration/registration.dto';

type UserData = {
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled: boolean;
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
  const { errors, clearStepErrors, setStepErrors } = useRegistration();

  const secondStepFields: (keyof UserData)[] = [
    UserDataFields.PhoneNumber,
    UserDataFields.BirthYear,
    UserDataFields.EducationDegree,
    UserDataFields.Occupation,
    UserDataFields.NewsletterEnabled,
    UserDataFields.CompaniesNewsEnabled,
    UserDataFields.TermsAndConditionsEnabled,
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === UserDataFields.PhoneNumber) {
      const formattedPhoneNumber = validations.formatPhoneNumber(value);
      updateUserData({ [name]: formattedPhoneNumber });
    } else {
      updateUserData({
        [name]:
          name === UserDataFields.BirthYear ? parseInt(value) || null : value,
      });
    }
  };

  const handleDropdownChange = (
    field: UserDataFields.EducationDegree | UserDataFields.Occupation,
    selectedOption: DropdownOption,
  ) => {
    updateUserData({
      [field]: selectedOption.value,
    });
  };

  const validateSecondStep = () => {
    const newErrors: Partial<RegistrationFormErrors> = {};

    secondStepFields.forEach((key) => {
      const error = validateField(key, userData[key], userData);
      newErrors[key] = error || '';
    });

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(RegistrationStep.TWO, newErrors);
    } else {
      clearStepErrors(RegistrationStep.TWO);
    }
  };

  const allFieldsAreFilled = () => {
    return (
      userData.phoneNumber !== '' &&
      userData.birthYear !== null &&
      userData.educationDegree !== null &&
      userData.occupation !== null &&
      userData.termsAndConditionsEnabled !== null
    );
  };

  useEffect(() => {
    if (isSubmitted || allFieldsAreFilled()) {
      validateSecondStep();
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
          name={UserDataFields.PhoneNumber}
          value={userData.phoneNumber}
          placeholder='Broj mobitela'
          onChange={handleInputChange}
          error={errors[2]?.phoneNumber}
        />

        <Input
          name={UserDataFields.BirthYear}
          value={userData.birthYear?.toString() || ''}
          placeholder='Godina rođenja'
          onChange={handleInputChange}
          error={errors[2]?.birthYear}
        />

        <Dropdown
          label='Stupanj obrazovanja'
          placeholder='Izaberi'
          options={educationDegreeOptions}
          setOption={(selectedOption) =>
            handleDropdownChange(UserDataFields.EducationDegree, selectedOption)
          }
          selectedOption={educationDegreeOptions.find(
            (option) => option.value === userData.educationDegree,
          )}
          errorLabel={errors[2]?.educationDegree}
        />

        <Dropdown
          label='Trenutna okupacija'
          placeholder='Izaberi'
          options={occupationOptions}
          setOption={(selectedOption) =>
            handleDropdownChange(UserDataFields.Occupation, selectedOption)
          }
          selectedOption={occupationOptions.find(
            (option) => option.value === userData.occupation,
          )}
          errorLabel={errors[2]?.occupation}
        />

        <CheckboxFieldsWrapper
          userData={userData}
          updateUserData={updateUserData}
          errorMessage={errors[2]?.termsAndConditionsEnabled}
        />
      </div>
    </>
  );
};
