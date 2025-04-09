import toast from 'react-hot-toast';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './ShoppingItem.module.scss';
import StarIcon from '@/assets/icons/rating-star-1.svg';
import StarIconGrey from '@/assets/icons/rating-star-disabled.svg';

import { ShopItem } from '@prisma/client';
import { ShopItemType } from '@ddays-app/types/src/enum';
import { getShopItemImgFromType } from '../../helpers/getShopItemImgFromType';
import { useShoppingContext } from '@/context/ShoppingContext';

interface ShoppingItemProps {
  product: ShopItem;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ product }) => {
  const { setCartItems, userPoints, totalCost, cartItems } =
    useShoppingContext();

  const [isInCart, setIsInCart] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const outOfStock: boolean = product.quantity === 0;
  const notEnoughPoints: boolean = useMemo(
    () => userPoints < totalCost + (product.price || 0),
    [userPoints, totalCost],
  );

  useEffect(() => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    setIsInCart(isProductInCart);
  }, [cartItems, product]);

  useEffect(() => {
    setDisabled(isInCart || outOfStock || notEnoughPoints);
  }, [isInCart, outOfStock, notEnoughPoints]);

  const handleCartBtnClick = () => {
    if (disabled) return;

    /* provjerit može li se kupiti više od samo jednog istog proizvoda */
    setCartItems((prevItems) => [
      ...prevItems,
      {
        ...product,
        quantity: 1,
        price: product.price ?? 0,
        type: product.type as ShopItemType,
        itemName: product.itemName,
      },
    ]);
    setIsInCart(true);
    toast.success('Proizvod dodan u košaricu');
  };

  return (
    <div className={styles.product}>
      <div className={styles.dottedBorderTopHorizontal} />
      <div className={styles.dottedBorderLeftVertical} />
      <div className={styles.dottedBorderBottomHorizontal} />
      <div className={styles.dottedBorderRightVertical} />
      {isInCart && <span className={styles.inCart}>U košarici</span>}
      <img
        className={styles.productImage}
        src={getShopItemImgFromType(product.type as ShopItemType)}
        alt='shop-item'
      />
      <h3>{product.itemName}</h3>
      <p
        className={`${styles.productSupply} ${
          disabled ? styles.productSupplyDisabled : ''
        }`}>
        Na zalihama: {product.quantity}
      </p>
      <div
        aria-disabled={disabled}
        onClick={handleCartBtnClick}
        className={`${styles.addToCartButton} ${
          disabled ? styles.addToCartButtonDisabled : ''
        }`}>
        <img
          className={styles.ratingStar}
          src={disabled ? StarIconGrey : StarIcon}
          alt=''
        />
        <span className={styles.pointsText}>
          {!isInCart ? product.price : 'MAX. 1'}
        </span>
      </div>
    </div>
  );
};

export default ShoppingItem;
