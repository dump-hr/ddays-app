import { useEffect, useState } from 'react';
import styles from './ShoppingHeader.module.scss';
import TransactionsIcon from '@/assets/icons/transactions-icon.svg';
import ShoppingCartIcon from '@/assets/icons/shopping-cart-icon.svg';

import { useDeviceType } from '@/hooks/UseDeviceType';
import { HeaderCard } from '@/components/Header/HeaderCard/HeaderCard';
import { NavigateHomeButton } from '@/components/NavigateHomeButton';
import ShoppingDonePopup from '../../popups/ShoppingDonePopup/ShoppingDonePopup';
import CartPopup from '../../popups/CartPopup/CartPopup';
import { useShoppingContext } from '@/context/ShoppingContext';

const ShoppingHeader: React.FC = () => {
  const [headerCardWidth, setHeaderCardWidth] = useState<number | null>(136);
  const [headerCardHeight, setHeaderCardHeight] = useState<number | null>(110);
  const [isOpenShoppingDonePopup, setIsOpenShoppingDonePopup] =
    useState<boolean>(false);
  const { cartItems } = useShoppingContext();

  const [isOpenShoppingCart, setIsOpenShoppingCart] = useState(false);
  /*   const [isOpenTransactions, setIsOpenTransactions] = useState(false); */

  const { isMobile } = useDeviceType({ breakpoint: 769 });

  useEffect(() => {
    if (isMobile) {
      setHeaderCardWidth(null);
      setHeaderCardHeight(110);
    } else {
      setHeaderCardWidth(136);
      setHeaderCardHeight(136);
    }
  }, [isMobile]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>SHOPPING</h1>
        <NavigateHomeButton />
      </div>
      <ShoppingDonePopup
        isOpen={isOpenShoppingDonePopup}
        closePopup={() => setIsOpenShoppingDonePopup(false)}
      />
      <CartPopup
        isOpen={isOpenShoppingCart}
        closePopup={() => setIsOpenShoppingCart(false)}
      />
      <div className={styles.headerCardsContainer}>
        <HeaderCard
          img={TransactionsIcon}
          text='Transakcije'
          width={headerCardWidth}
          height={headerCardHeight}
          imgHeight={78}
          imgWidth={44}
          onClick={() => setIsOpenShoppingDonePopup(true)}
        />
        <HeaderCard
          img={ShoppingCartIcon}
          text='Košarica'
          width={headerCardWidth}
          height={headerCardHeight}
          imgHeight={78}
          imgWidth={44}
          onClick={() => setIsOpenShoppingCart(true)}>
          {cartItems.length > 0 && (
            <div className={styles.numberOfItemsInCart}>{cartItems.length}</div>
          )}
        </HeaderCard>
      </div>
    </div>
  );
};

export default ShoppingHeader;
