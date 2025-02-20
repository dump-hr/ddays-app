import styles from './ShoppingPage.module.scss';
import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';
import { useState } from 'react';

export const ShoppingPage = () => {
  const [numItemsInCart, setNumItemsInCart] = useState(1);
  return (
    <div className={styles.wrapper}>
      <ShoppingHeader numItemsInCart={numItemsInCart} />
      <ShoppingItems setNumItemsInCart={setNumItemsInCart} />
    </div>
  );
};
