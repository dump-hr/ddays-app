import styles from './ShoppingPage.module.scss';
import { ShoppingProvider } from '@/context/ShoppingContext';
import { useIsFirstPageVisit } from '@/hooks/useIsFirstPageVisit';

import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';
import ShoppingWelcome from './sections/ShoppingWelcome';

export const ShoppingPage = () => {
  const { firstShopVisit, setFirstShopVisit } =
    useIsFirstPageVisit('firstShopVisit');

  return (
    <div className={styles.wrapper}>
      <ShoppingProvider>
        {firstShopVisit ? (
          <ShoppingWelcome setFirstShopVisit={setFirstShopVisit} />
        ) : (
          <>
            <ShoppingHeader />
            <ShoppingItems />
          </>
        )}
      </ShoppingProvider>
    </div>
  );
};
