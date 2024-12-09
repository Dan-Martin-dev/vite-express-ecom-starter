import { createContext, useContext } from "react";
import { products } from "@/assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContext = (props) => {

    const value = {}

  return (
    <ShopContext.Provider value={value}>
        {props,children}
    </ShopContext.Provider>

  )
};

export default ShopContextProvider;
