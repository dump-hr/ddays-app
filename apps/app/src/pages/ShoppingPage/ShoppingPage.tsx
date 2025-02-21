import styles from './ShoppingPage.module.scss';
import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';
import { useState, useEffect, useRef } from 'react';
import ShoppingWelcome from './sections/ShoppingWelcome';

export const ShoppingPage = () => {
  const [numItemsInCart, setNumItemsInCart] = useState(0);
  const [firstShopVisit, setFirstShopVisit] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;

    if (!JSON.parse(localStorage.getItem('firstShopVisit') || 'false')) {
      localStorage.setItem('firstShopVisit', 'true');
      setFirstShopVisit(true);
    } else {
      localStorage.setItem('firstShopVisit', 'false');
      setFirstShopVisit(false);
    }

    isMounted.current = true;
  }, [isMounted]);

  return (
    <div className={styles.wrapper}>
      {firstShopVisit ? (
        <ShoppingWelcome setFirstShopVisit={setFirstShopVisit} />
      ) : (
        <>
          <ShoppingHeader numItemsInCart={numItemsInCart} />
          <ShoppingItems setNumItemsInCart={setNumItemsInCart} />
        </>
      )}
    </div>
  );
};
