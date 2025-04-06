import { useState } from 'react';
import { useShoppingContext } from '@/context/ShoppingContext';
import styles from './CartPopup.module.scss';
import StarIcon from '@/assets/icons/star.svg';

import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import Button from '@/components/Button';
import CartItem from '@/components/CartItem';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import ShoppingDonePopup from '../ShoppingDonePopup/ShoppingDonePopup';

interface PopupProps {
  isOpen: boolean;
  closePopup: () => void;
}

const CartPopup = ({ closePopup, isOpen }: PopupProps) => {
  const { cartItems, totalCost, setUserPoints } = useShoppingContext();
  const [isBought, setIsBought] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const openConfirmPopup = () => {
    setIsBought(true);
    closePopup();
  };

  const clickConfirmPopup = () => {
    setIsConfirmed(true);
    closePopup();
    setUserPoints((prev) => prev - totalCost);
  };

  const closeConfirmPopup = () => {
    setIsBought(false);
    setIsConfirmed(false);
  };

  const closeShoppingDonePopup = () => {
    setIsBought(false);
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
        isOpen={isOpen}>
        <div className={styles.cartContainer}>
          <div className={styles.contentDiv}>
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
          <div className={styles.buttonContainer}>
            <Button
              variant='black'
              style={{ width: '100%', marginTop: '10px' }}
              onClick={openConfirmPopup}>
              KUPI ZA
              <img src={StarIcon} className={styles.starIcon} />
              {totalCost}
            </Button>
          </div>
        </div>
      </PopupLayout>

      {isBought && (
        <ConfirmPopup
          isOpen={isBought}
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
