import { createContext, FC, ReactNode } from "react";
import { products } from "@/assets/frontend_assets/assets";
import type { Product } from "@/types/types";

interface ShopContextType {
  products: Product[];
  currency: string;
  delivery_fee: number;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider: FC<ShopContextProviderProps> = ({ children }) => {
  const currency = `$`
  const delivery_fee = 10;

  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
