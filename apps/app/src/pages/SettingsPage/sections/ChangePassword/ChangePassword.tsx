import { useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './ChangePassword.module.scss';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

import { useUserContext } from '@/context/UserContext';
import { useRegistration } from '@/context/RegistrationContext';
import { useInputHandlers } from '@/hooks/useInputHandlers';

import { SettingsEdits, UserDataFields } from '@/types/enums';
import { RegistrationFormErrors } from '@/types/errors/errors.dto';
import { changePasswordFields } from '../EditProfileSection/inputs';
import { allFieldsAreFilled, validateField } from '@/helpers/validateInput';

interface ChangePasswordProps {
  setIsChangingPassword: (value: boolean) => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  setIsChangingPassword,
}) => {
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
    if (allFieldsAreFilled(changePasswordFields, userSettingsData)) {
      validateChangePassword();
    }
  }, [userSettingsData]);

  const handleSaveClick = () => {
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
        <Input
          name={UserDataFields.Password}
          type='password'
          placeholder='Trenutna lozinka'
          value={userSettingsData['password']}
          onChange={handleInputChange}
          error={errors[SettingsEdits.PASSWORD]?.[UserDataFields.Password]}
        />
        <Input
          name={UserDataFields.NewPassword}
          type='password'
          placeholder='Nova lozinka'
          value={userSettingsData['newPassword']}
          onChange={handleInputChange}
          error={errors[SettingsEdits.PASSWORD]?.[UserDataFields.NewPassword]}
        />
        <Input
          name={UserDataFields.RepeatedPassword}
          type='password'
          placeholder='Potvrdi novu lozinku'
          value={userSettingsData['repeatedPassword']}
          onChange={handleInputChange}
          error={
            errors[SettingsEdits.PASSWORD]?.[UserDataFields.RepeatedPassword]
          }
        />
      </div>
      <Button variant='black' onClick={handleSaveClick}>
        Spremi
      </Button>
    </div>
  );
};
