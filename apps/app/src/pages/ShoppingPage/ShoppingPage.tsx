import styles from './ShoppingPage.module.scss';
import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';

export const ShoppingPage = () => {
  return (
    <div className={styles.wrapper}>
      <ShoppingHeader />
      <ShoppingItems />
    </div>
  );
};
