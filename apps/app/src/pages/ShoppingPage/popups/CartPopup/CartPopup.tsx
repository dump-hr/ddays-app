import { useState } from 'react';
import { useShoppingContext } from '@/context/ShoppingContext';
import styles from './CartPopup.module.scss';
import StarIcon from '@/assets/icons/star.svg';

import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Button from '@/components/Button';
import CartItem from '@/components/CartItem';
import ConfirmPopup from '../ConfirmPopup';
import ShoppingDonePopup from '../ShoppingDonePopup';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const CartPopup = ({ closePopup, isOpen }: PopupProps) => {
  const { cartItems, totalCost } = useShoppingContext();
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const openConfirmPopup = () => {
    if (cartItems.length > 0) {
      setIsBuyClicked(true);
      return;
    }
    closePopup();
  };

  const clickConfirmPopup = () => {
    setIsConfirmed(true);
    closePopup();
  };

  const closeConfirmPopup = () => {
    setIsBuyClicked(false);
    setIsConfirmed(false);
  };

  const closeShoppingDonePopup = () => {
    setIsBuyClicked(false);
    setIsConfirmed(false);
  };

  return (
    <>
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
        closePopup={closePopup}
        isOpen={isOpen}
        justifyContent='space-between'>
        <div className={styles.contentDiv}>
          <div className={styles.cartItemsList}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartItem key={index} item={item} index={index} />
              ))
            ) : (
              <div className={styles.emptyCart}>
                <p className={styles.noItems}>Košarica je prazna ⚠️</p>
              </div>
            )}
          </div>
          <Button
            variant='black'
            style={{ width: '100%', marginTop: '10px' }}
            onClick={openConfirmPopup}>
            {cartItems.length > 0 ? (
              <>
                KUPI ZA
                <img src={StarIcon} className={styles.starIcon} />
                {totalCost}
              </>
            ) : (
              'ZATVORI'
            )}
          </Button>
        </div>
      </PopupLayout>

      {isBuyClicked && (
        <ConfirmPopup
          isOpen={isBuyClicked}
          closePopup={closeConfirmPopup}
          confirmPopup={clickConfirmPopup}
        />
      )}

      {isConfirmed && (
        <ShoppingDonePopup
          isOpen={isConfirmed}
          closePopup={closeShoppingDonePopup}
        />
      )}
    </>
  );
};

export default CartPopup;
