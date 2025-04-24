import { ChangeEvent, useEffect } from 'react';
import c from './SecondStepRegistrationForm.module.scss';
import { Input } from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import { DropdownOption } from '../../Dropdown/DropdownOption';
import {
  allFieldsAreFilled,
  validateField,
  validations,
} from '@/helpers/validateInput';
import { RegistrationFormErrors } from '@/types/errors/errors.dto';
import { UserDataFields, UserProfileFields } from '@/types/enums';
import { useRegistration } from '@/providers/RegistrationContext';
import { RegistrationStep } from '@/types/registration/registration.dto';
import { RegistrationDto } from '@/types/user/user';
import { dropdownInputs } from '@/constants/sharedInputs';

type Props = {
  userData: Partial<RegistrationDto>;
  updateUserData: (newData: Partial<RegistrationDto>) => void;
  isSubmitted: boolean;
};

export const SecondStepRegistrationForm = ({
  userData,
  updateUserData,
  isSubmitted,
}: Props) => {
  const { errors, clearStepErrors, setStepErrors } = useRegistration();

  const secondStepFields: (keyof Partial<RegistrationDto>)[] = [
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
      const error = validateField(key, userData[key]);
      newErrors[key] = error || '';
    });

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(RegistrationStep.TWO, newErrors);
    } else {
      clearStepErrors(RegistrationStep.TWO);
    }
  };

  useEffect(() => {
    if (isSubmitted || allFieldsAreFilled(secondStepFields, userData)) {
      validateSecondStep();
    }
  }, [isSubmitted, userData]);

  const educationDegreeOptions =
    dropdownInputs.find(
      (dropdown) => dropdown.name === UserProfileFields.EducationDegree,
    )?.options || [];

  const occupationOptions =
    dropdownInputs.find(
      (dropdown) => dropdown.name === UserProfileFields.Occupation,
    )?.options || [];

  const hasError = (error: string | undefined) => {
    if (error && error != '') {
      return true;
    }

    return false;
  };

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
          hasError={hasError(errors[2]?.educationDegree)}
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
          hasError={hasError(errors[2]?.occupation)}
        />
      </div>
    </>
  );
};
