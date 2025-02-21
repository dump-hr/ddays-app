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

    isMounted.current = true;
    const storedValue = JSON.parse(
      localStorage.getItem('firstShopVisit') || 'null',
    );

    if (storedValue === null) {
      localStorage.setItem('firstShopVisit', 'true');
      setFirstShopVisit(true);
      return;
    }

    localStorage.setItem('firstShopVisit', 'false');
    setFirstShopVisit(false);
  }, []);

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
