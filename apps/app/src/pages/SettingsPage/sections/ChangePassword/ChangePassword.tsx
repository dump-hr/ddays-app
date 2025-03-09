import toast from 'react-hot-toast';
import styles from './ChangePassword.module.scss';
import Button from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { useUserContext } from '../../../../context/UserContext';
import { useInputHandlers } from '../../../../hooks/useInputHandlers';

interface ChangePasswordProps {
  setIsChangingPassword: (value: boolean) => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  setIsChangingPassword,
}) => {
  const { userSettingsData, updateUserSettingsData } = useUserContext();
  const { handleInputChange } = useInputHandlers(updateUserSettingsData);

  const handleSaveClick = () => {
    // TODO: validacija trenutne lozinke sa backend
    if (
      userSettingsData['newPassword'] !== userSettingsData['repeatedPassword']
    ) {
      toast.error('Lozinke se ne podudaraju, pokušaj ponovo!');
      return;
    }

    //TODO izmjena lozinke sa backend
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
          name='password'
          type='password'
          placeholder='Trenutna lozinka'
          value={userSettingsData['password']}
          onChange={handleInputChange}
        />
        <Input
          name='newPassword'
          type='password'
          placeholder='Nova lozinka'
          value={userSettingsData['newPassword']}
          onChange={handleInputChange}
        />
        <Input
          name='repeatedPassword'
          type='password'
          placeholder='Potvrdi novu lozinku'
          value={userSettingsData['repeatedPassword']}
          onChange={handleInputChange}
        />
      </div>
      <Button variant='black' onClick={handleSaveClick}>
        Spremi
      </Button>
    </div>
  );
};
