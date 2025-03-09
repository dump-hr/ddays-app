import Button from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import styles from './ChangePassword.module.scss';

interface ChangePasswordProps {
  isChangingPassword: boolean;
  setIsChangingPassword: (value: boolean) => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  isChangingPassword,
  setIsChangingPassword,
}) => {
  const handleSaveClick = () => {
    setIsChangingPassword(false);
  };

  return (
    <div className={styles.changePasswordsContainer}>
      <div className={styles.passwordsInputs}>
        <Input
          name='currentPassword'
          type='password'
          placeholder='Trenutna lozinka'
          disabled={!isChangingPassword}
          value={undefined}
          onChange={() => {}}
        />
        <Input
          name='newPassword'
          type='password'
          placeholder='Nova lozinka'
          disabled={!isChangingPassword}
          value={undefined}
          onChange={() => {}}
        />
        <Input
          name='confirmNewPassword'
          type='password'
          placeholder='Potvrdi novu lozinku'
          disabled={!isChangingPassword}
          value={undefined}
          onChange={() => {}}
        />
      </div>
      <Button variant='black' onClick={handleSaveClick}>
        Spremi
      </Button>
    </div>
  );
};
