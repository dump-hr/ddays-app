import { useState, useEffect, useRef } from 'react';
import styles from './ShoppingPage.module.scss';

import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';
import ShoppingWelcome from './sections/ShoppingWelcome';

export const ShoppingPage = () => {
  const [numItemsInCart, setNumItemsInCart] = useState<number>(0);
  const [firstShopVisit, setFirstShopVisit] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;

    isMounted.current = true;
    const storedValue = JSON.parse(
      localStorage.getItem('firstShopVisit') || 'null',
    );

    if (storedValue === null || storedValue === true) {
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
