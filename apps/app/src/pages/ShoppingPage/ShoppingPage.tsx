import styles from './ShoppingPage.module.scss';
import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';
import { useState } from 'react';

export const ShoppingPage = () => {
  const [numItemsInCart, setNumItemsInCart] = useState(0);
  return (
    <div className={styles.wrapper}>
      <ShoppingHeader numItemsInCart={numItemsInCart} />
      <ShoppingItems setNumItemsInCart={setNumItemsInCart} />
    </div>
  );
};
