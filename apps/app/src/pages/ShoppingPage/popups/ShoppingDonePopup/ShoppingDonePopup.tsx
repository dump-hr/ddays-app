import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import styles from './ShoppingDonePopup.module.scss';
import DuckCoolImg from '@/assets/images/duck-cool.png';
import Button from '@/components/Button';
import StarIcon from '@/assets/icons/star-2.svg';
import AlertSection from '@/components/AlertSection';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const ShoppingDonePopup = ({ isOpen, closePopup }: PopupProps) => {
  return (
    <PopupLayout
      variant='dark'
      headerTitleComponent={<></>}
      closePopup={() => closePopup()}
      isOpen={isOpen}
      imgSrc={DuckCoolImg}>
      <img src={StarIcon} alt='star' className={styles.starIconTopRight} />
      <img src={StarIcon} alt='star' className={styles.starIconBottomLeft} />
      <div className={styles.contentDiv}>
        <div className={styles.textContainer}>
          <h2>SHOPPING OBAVLJEN!</h2>
          <p>Slavica je ponosna i zahvalna što podržavaš njen novi biznis.</p>
        </div>
        <div className={styles.buttonContainer}>
          <AlertSection>
            Tvoje stvari zadržavamo samo sat vremena, stoga brzo na štand po
            stvari.
          </AlertSection>
          <Button
            variant='black'
            style={{ width: '100%' }}
            onClick={closePopup}>
            ZATVORI
          </Button>
        </div>
      </div>
    </PopupLayout>
  );
};

export default ShoppingDonePopup;
