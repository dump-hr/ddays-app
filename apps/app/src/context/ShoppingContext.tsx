import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import {
  products,
  userPointsAmount,
} from '@/pages/ShoppingPage/sections/ShoppingItems/products';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';

interface ShoppingContextType {
  cartItems: ShopItemDto[];
  setCartItems: React.Dispatch<React.SetStateAction<ShopItemDto[]>>;
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  productsList: typeof products;
  setProductsList: React.Dispatch<React.SetStateAction<typeof products>>;
  totalCost: number;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined,
);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error(
      'useShoppingContext must be used within a ShoppingProvider',
    );
  }
  return context;
};

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ShopItemDto[]>([]);
  const [userPoints, setUserPoints] = useState(userPointsAmount);
  const [productsList, setProductsList] = useState(products);

  const totalCost = useMemo(
    () =>
      cartItems.reduce((acc, product) => {
        return acc + product.price;
      }, 0),
    [cartItems],
  );

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        setCartItems,
        userPoints,
        setUserPoints,
        productsList,
        setProductsList,
        totalCost,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
};
