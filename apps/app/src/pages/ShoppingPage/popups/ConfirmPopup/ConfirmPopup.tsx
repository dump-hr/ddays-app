import styles from './ConfirmPopup.module.scss';
import StarIcon from '@/assets/icons/star.svg';
import { useShoppingContext } from '@/context/ShoppingContext';

import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Button from '@/components/Button';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}
const ConfirmPopup = ({ isOpen, closePopup }: PopupProps) => {
  const { totalCost, cartItems, setBoughtItems, setCartItems } =
    useShoppingContext();

  return (
    <PopupLayout
      variant='light'
      headerTitleComponent={<>Jeste li sigurni? ⚠️</>}
      closePopup={closePopup}
      isOpen={isOpen}>
      <div className={styles.textContainer}>
        <p>
          Kupnjom ovih stvari potrošit ćete bodove koje ste do sada skupili. To
          može utjecat i na tvoju rang listu.{' '}
        </p>
        <p>
          Kupljeni proizvod možeš preuzeti na DUMP štandu u roku od 30 minuta.
          Ako ne preuzmeš proizvod, vraćamo ga u ponudu ostalim posjetiteljima,
          a tebi ne vraćamo oduzete bodove.
        </p>
      </div>
      <Button
        variant='black'
        style={{ width: '100%' }}
        onClick={() => {
          setBoughtItems((prev) => [...prev, ...cartItems]);
          setCartItems([]);
          closePopup();
        }}>
        KUPI ZA
        <img src={StarIcon} className={styles.starIcon} />
        {totalCost}
      </Button>
    </PopupLayout>
  );
};

export default ConfirmPopup;
