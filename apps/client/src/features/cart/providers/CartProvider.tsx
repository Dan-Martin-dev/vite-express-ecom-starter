import {
    createContext,
    FC,
    useContext,
  } from "react";
  import type { ShopContextProviderProps, ShopContextType } from "@/types/types";
  import { VITE_API_BASE_URL } from "@/utils/config";
  import useFetchProducts from "@/hooks/useFetchProducts";
  
  // Create the context with a default value
  export const CartContext = createContext<ShopContextType | undefined>(
    undefined
  );
  
  export const CartProvider: FC<ShopContextProviderProps> = ({ children }) => {
    const { products, loading, error, fetchProducts } = useFetchProducts();
    
    // Constants for currency and delivery fee
    const currency = `$`;
    const delivery_fee = 10;
  
    // Context value
    const value: ShopContextType = {
      products,
      currency,
      delivery_fee,
      loading,
      error,
      fetchProducts, // Include fetchProducts in the context value
    };
    console.log("API URL:", VITE_API_BASE_URL);
  
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  };
  
  // Custom hook to use the ShopContext
  // eslint-disable-next-line react-refresh/only-export-components
  export const useShop = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error("useShop must be used within a ShopProvider");
    }
    return context;
  };
  
  export default CartProvider;
  