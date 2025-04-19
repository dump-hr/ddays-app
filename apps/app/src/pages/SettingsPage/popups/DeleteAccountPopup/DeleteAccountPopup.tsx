import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import styles from './DeleteAccountPopup.module.scss';
import DuckGoodbyeImg from '@/assets/images/duck-goodbye.png';
import Button from '@/components/Button';
import { useDeleteAccount } from '@/api/user/useDeleteAccount';

interface PopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DeleteAccountPopup = ({ isOpen, setIsOpen }: PopupProps) => {
  const deleteAccount = useDeleteAccount();

  const handleDelete = () => {
    deleteAccount.mutate();
  };

  return (
    <PopupLayout
      variant='dark'
      headerTitleComponent={<>Obriši račun</>}
      closePopup={() => setIsOpen(false)}
      isOpen={isOpen}
      imgSrc={DuckGoodbyeImg}>
      <div className={styles.contentDiv}>
        <div className={styles.textDiv}>
          <h2>Jesi li siguran da želiš obrisati račun?</h2>
          <p>
            Ukoliko ga obrišeš, nećeš nikad više moći pristupiti ovom računu i
            svi tvoji bodovi i postignuća bit će izgubljeni.
          </p>
        </div>
        <Button
          variant='orange'
          style={{ width: '100%' }}
          onClick={handleDelete}>
          Svejedno obriši
        </Button>
      </div>
    </PopupLayout>
  );
};

export default DeleteAccountPopup;
