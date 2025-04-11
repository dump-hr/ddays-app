import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';

interface ShoppingContextType {
  cartItems: ShopItemDto[];
  setCartItems: React.Dispatch<React.SetStateAction<ShopItemDto[]>>;
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
  const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  };

  const [cartItems, setCartItems] = useState<ShopItemDto[]>(getCartItems());

  const totalCost = useMemo(
    () =>
      cartItems.reduce((acc, product) => {
        return acc + (product.price || 0);
      }, 0),
    [cartItems],
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalCost,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
};
