import Button from '../../../../components/Button';
import { Input } from '../../../../components/Input';

interface ChangePasswordProps {
  isChangingPassword: boolean;
  setIsChangingPassword: (value: boolean) => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  isChangingPassword,
  setIsChangingPassword,
}) => {
  const handleSave = () => {
    setIsChangingPassword(false);
  };

  return (
    <>
      <Input
        name='currentPassword'
        type='password'
        placeholder='Trenutna lozinka'
        disabled={!isChangingPassword}
        value={undefined}
        onChange={()=>{}}
      />
      <Input
        name='newPassword'
        type='password'
        placeholder='Nova lozinka'
        disabled={!isChangingPassword}
        value={undefined}
        onChange={()=>{}}
      />
      <Input
        name='confirmNewPassword'
        type='password'
        placeholder='Potvrdi novu lozinku'
        disabled={!isChangingPassword}
        value={undefined}
        onChange={()=>{}}
      />

      <Button variant='black' onClick={handleSave}>
        Spremi
      </Button>
    </>
  );
};
