import styles from './ShoppingPage.module.scss';
import { ShoppingProvider } from '@/context/ShoppingContext';
import { useIsFirstPageVisit } from '@/hooks/useIsFirstPageVisit';

import ShoppingItems from './sections/ShoppingItems';
import ShoppingHeader from './sections/ShoppingHeader';
import ShoppingWelcome from './sections/ShoppingWelcome';

export const ShoppingPage = () => {
  const { firstPageVisit, setFirstPageVisit } =
    useIsFirstPageVisit('firstShopVisit');

  return (
    <div className={styles.wrapper}>
      <ShoppingProvider>
        {firstPageVisit ? (
          <ShoppingWelcome setFirstShopVisit={setFirstPageVisit} />
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
