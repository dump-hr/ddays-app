import styles from './ConfirmPopup.module.scss';
import StarIcon from '@/assets/icons/star.svg';
import { useShoppingContext } from '@/context/ShoppingContext';
import { useBuyShopItem } from '@/api/shop/useBuyShopItem';

import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Button from '@/components/Button';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { ShoppingCartItemStage } from '@ddays-app/types';

interface PopupProps {
  isOpen: boolean;
  confirmPopup: () => void;
  closePopup: () => void;
}

const ConfirmPopup = ({ isOpen, confirmPopup, closePopup }: PopupProps) => {
  const { totalCost, cartItems, setCartItems } = useShoppingContext();
  const { data: user } = useLoggedInUser();
  const { mutate: buyShopItemsMutation } = useBuyShopItem();

  const buyItems = async () => {
    const newTransactionItems = cartItems.map((item) => ({
      userId: user?.id ?? 0,
      shopItemId: item.id,
      quantity: item.quantity ?? 0,
      stage: ShoppingCartItemStage.UNCOLLECTED,
    }));
    buyShopItemsMutation(newTransactionItems);
    setCartItems([]);
  };

  const handleConfirm = async () => {
    buyItems();
    confirmPopup();
  };
  
  return (
    <PopupLayout
      variant='light'
      headerTitleComponent={<>Jeste li sigurni? ⚠️</>}
      closePopup={closePopup}
      isOpen={isOpen}
      justifyContent='end'>
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
      <Button variant='black' style={{ width: '100%' }} onClick={handleConfirm}>
        KUPI ZA
        <img src={StarIcon} className={styles.starIcon} />
        {totalCost}
      </Button>
    </PopupLayout>
  );
};

export default ConfirmPopup;
