import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import styles from './CartPopup.module.scss';
import Button from '@/components/Button';
import { useShoppingContext } from '@/context/ShoppingContext';
import CartItem from '@/components/CartItem';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const CartPopup = ({ closePopup, isOpen }: PopupProps) => {
  const { cartItems } = useShoppingContext();

  return (
    <PopupLayout
      variant='light'
      headerTitleComponent={
        <>
          Košarica{' '}
          <span className={styles.numItemsInCart}>
            {`(${cartItems.length})`}
          </span>
        </>
      }
      closePopup={() => closePopup()}
      isOpen={isOpen}>
      <div className={styles.contentDiv}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            return <CartItem item={item} index={index} />;
          })
        ) : (
          <div className={styles.emptyCart}>
            <p>Košarica je prazna</p>
          </div>
        )}
      </div>
      <Button variant='black' style={{ width: '100%' }}>
        Svejedno obriši
      </Button>
    </PopupLayout>
  );
};

export default CartPopup;
