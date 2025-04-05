import styles from './CartItem.module.scss';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import { ShopItemType } from '@ddays-app/types';
import { useShoppingContext } from '@/context/ShoppingContext';
import { getShopItemImgFromType } from '@/helpers/getShopItemImgFromType';
import RedStarIcon from '@/assets/icons/star-red.svg';
import DeleteIcon from '@/assets/icons/bin-delete.svg';

interface CartItemProps {
  item: ShopItemDto;
  index: number;
}
const CartItem = ({ item, index }: CartItemProps) => {
  const {
    cartItems: { length },
  } = useShoppingContext();
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
        <p className={styles.quantity}>Na zalihama: {item.quantity}</p>
        <span className={styles.price}>
          <img src={RedStarIcon} />
          {item.price}
        </span>
        <div className={styles.deleteButton}>
          <img src={DeleteIcon} alt='delete' />
        </div>
      </div>
      {length !== index + 1 && <div className={styles.divider} />}
    </div>
  );
};

export default CartItem;
