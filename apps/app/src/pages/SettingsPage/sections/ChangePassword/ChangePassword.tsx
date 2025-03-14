import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ChangePassword.module.scss';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

import { useUserContext } from '@/context/UserContext';
import { useRegistration } from '@/context/RegistrationContext';
import { useInputHandlers } from '@/hooks/useInputHandlers';

import { SettingsEdits } from '@/types/enums';
import { RegistrationFormErrors } from '@/types/errors/errors.dto';
import {
  changePasswordFields,
  passwordInputs,
} from '../EditProfileSection/inputs';
import { allFieldsAreFilled, validateField } from '@/helpers/validateInput';

interface ChangePasswordProps {
  setIsChangingPassword: (value: boolean) => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  setIsChangingPassword,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { userSettingsData, updateUserSettingsData } = useUserContext();
  const { handleInputChange } = useInputHandlers(updateUserSettingsData);

  const { errors, clearStepErrors, setStepErrors, isStepValid } =
    useRegistration();

  const validateChangePassword = () => {
    const newErrors: Partial<RegistrationFormErrors> = {};

    changePasswordFields.forEach((key) => {
      const error = validateField(key, userSettingsData[key], userSettingsData);
      newErrors[key] = error || '';
    });

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(SettingsEdits.PASSWORD, newErrors);
    } else {
      clearStepErrors(SettingsEdits.PASSWORD);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (!isMounted) return;
    validateChangePassword();
  }, [userSettingsData]);

  const handleSaveClick = () => {
    if (!allFieldsAreFilled(changePasswordFields, userSettingsData)) {
      toast.error('Sva polja moraju biti popunjena!');
      return;
    }

    validateChangePassword();
    if (!isStepValid(SettingsEdits.PASSWORD)) {
      toast.error('Podaci nisu ispravno uneseni!');
      return;
    }
    // TODO: validacija trenutne lozinke sa backendom
    // TODO izmjena lozinke sa backend

    setPasswordInputsToDefault();
    toast.success('Podaci uspješno izmjenjeni!');
    setIsChangingPassword(false);
  };

  const setPasswordInputsToDefault = () => {
    updateUserSettingsData({
      password: '',
      newPassword: '',
      repeatedPassword: '',
    });
  };

  return (
    <div className={styles.changePasswordsContainer}>
      <div className={styles.passwordsInputs}>
        {passwordInputs.map((input) => {
          return (
            <Input
              key={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={userSettingsData[input.name]?.toString()}
              onChange={handleInputChange}
              error={errors[SettingsEdits.PASSWORD]?.[input.name]}
            />
          );
        })}
      </div>
      <Button variant='black' onClick={handleSaveClick}>
        Spremi
      </Button>
    </div>
  );
};
