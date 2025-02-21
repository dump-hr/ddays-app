import styles from './ShoppingPage.module.scss';
import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';
import { useState, useEffect } from 'react';
import ShoppingWelcome from './sections/ShoppingWelcome';

export const ShoppingPage = () => {
  const [numItemsInCart, setNumItemsInCart] = useState(0);
  const [firstShopVisit, setFirstShopVisit] = useState(false);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('firstShopVisit') || 'false')) {
      localStorage.setItem('firstShopVisit', 'true');
      setFirstShopVisit(true);
    } else {
      localStorage.setItem('firstShopVisit', 'false');
      setFirstShopVisit(false);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {firstShopVisit ? (
        <ShoppingWelcome />
      ) : (
        <>
          <ShoppingHeader numItemsInCart={numItemsInCart} />
          <ShoppingItems setNumItemsInCart={setNumItemsInCart} />
        </>
      )}
    </div>
  );
};
