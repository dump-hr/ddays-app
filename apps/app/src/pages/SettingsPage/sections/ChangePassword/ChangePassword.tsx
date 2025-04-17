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
import { changePasswordFields, passwordInputs } from '../inputs';
import { allFieldsAreFilled, validateField } from '@/helpers/validateInput';
import { useChangeUserPassword } from '@/api/user/useChangeUserPassword';

interface ChangePasswordProps {
  setIsChangingPassword: (value: boolean) => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  setIsChangingPassword,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userSettingsData, updateUserSettingsData } = useUserContext();
  const { handleInputChange } = useInputHandlers(updateUserSettingsData);

  const { errors, clearStepErrors, setStepErrors, isStepValid } =
    useRegistration();

  const updateUserPasswordMutation = useChangeUserPassword();

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
    if (
      isSubmitted ||
      allFieldsAreFilled(changePasswordFields, userSettingsData)
    )
      validateChangePassword();
  }, [userSettingsData, isSubmitted]);

  const handleSaveClick = () => {
    setIsSubmitted(true);
    validateChangePassword();

    if (!isStepValid(SettingsEdits.PASSWORD)) {
      toast.error('Podaci nisu ispravno uneseni!');
      return;
    }

    updateUserPasswordMutation.mutate({
      currentPassword: userSettingsData.password ?? '',
      newPassword: userSettingsData.newPassword ?? '',
    });

    setPasswordInputsToDefault();
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
              error={
                isSubmitted ? errors[SettingsEdits.PASSWORD]?.[input.name] : ''
              }
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
