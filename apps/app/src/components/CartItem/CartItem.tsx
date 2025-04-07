import styles from './CartItem.module.scss';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import { ShopItemType } from '@ddays-app/types';
import { useShoppingContext } from '@/context/ShoppingContext';
import { getShopItemImgFromType } from '@/helpers/getShopItemImgFromType';
import RedStarIcon from '@/assets/icons/star-red.svg';
import DeleteIcon from '@/assets/icons/bin-delete.svg';
import { useMemo } from 'react';

interface CartItemProps {
  item: ShopItemDto;
  index: number;
}
const CartItem = ({ item, index }: CartItemProps) => {
  const { cartItems, setCartItems, productsList } = useShoppingContext();

  const product = useMemo(
    () => productsList.find((product) => product.id === item.id),
    [productsList, item.id],
  );

  const handleDelete = () => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id,
    );
    setCartItems(updatedCartItems);
  };

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={getShopItemImgFromType(item.type as ShopItemType)}
        />
      </div>
      <div className={styles.itemDetails}>
        <h3>{item.itemName}</h3>
        <p className={styles.quantity}>
          Na zalihama: {product?.quantity ?? 'nepoznato'}
        </p>
        <span className={styles.price}>
          <img src={RedStarIcon} />
          {item.price}
        </span>
        <div className={styles.deleteButton} onClick={handleDelete}>
          <img src={DeleteIcon} alt='delete' />
        </div>
      </div>
      {cartItems.length !== index + 1 && <div className={styles.divider} />}
    </div>
  );
};

export default CartItem;
