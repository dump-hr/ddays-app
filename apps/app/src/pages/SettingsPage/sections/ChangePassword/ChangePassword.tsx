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
import {
  allFieldsAreFilled,
  validateField,
  validateRepeatedPassword,
} from '@/helpers/validateInput';
import { useChangeUserPassword } from '@/api/user/useChangeUserPassword';

export const ChangePassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    passwordInputsData,
    updatePasswordInputsData,
    setIsChangingPassword,
  } = useUserContext();
  const { handleInputChange } = useInputHandlers(updatePasswordInputsData);

  const { errors, clearStepErrors, setStepErrors, isStepValid } =
    useRegistration();

  const updateUserPasswordMutation = useChangeUserPassword();

  const validateChangePassword = () => {
    const newErrors: Partial<RegistrationFormErrors> = {};

    changePasswordFields.forEach((key) => {
      const error = validateField(key, passwordInputsData[key]);
      newErrors[key] = error || '';
    });

    const passwordsMatchError = validateRepeatedPassword(
      passwordInputsData.newPassword,
      passwordInputsData.repeatedPassword,
    );

    if (passwordsMatchError) {
      newErrors.repeatedPassword = passwordsMatchError;
    }

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(SettingsEdits.PASSWORD, newErrors);
    } else {
      clearStepErrors(SettingsEdits.PASSWORD);
    }
  };

  useEffect(() => {
    if (
      isSubmitted ||
      allFieldsAreFilled(changePasswordFields, passwordInputsData)
    )
      validateChangePassword();
  }, [passwordInputsData, isSubmitted]);

  const handleSaveClick = () => {
    setIsSubmitted(true);
    validateChangePassword();

    if (!isStepValid(SettingsEdits.PASSWORD)) {
      toast.error('Podaci nisu ispravno uneseni!');
      return;
    }

    updateUserPasswordMutation.mutate(
      {
        currentPassword: passwordInputsData.password ?? '',
        newPassword: passwordInputsData.newPassword ?? '',
      },
      {
        onSuccess: () => {
          setPasswordInputsToDefault();
          setIsChangingPassword(false);
        },
      },
    );
  };

  const setPasswordInputsToDefault = () => {
    updatePasswordInputsData({
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
              value={passwordInputsData[input.name]?.toString()}
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
