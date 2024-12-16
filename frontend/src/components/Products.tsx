import { ShopContext } from "@/context/ShopContext";
import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
/* import type { Product } from "@/types/types"; */

const Products = () => {
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }
  const [latestProducts, setLatestProduct] = useState([]);

  
  const { products, currency, delivery_fee } = shopContext;

  useEffect(() => {
    setLatestProduct(products.slice(0, 6));
  }, [products]);

  return (
    <>
      {latestProducts.slice(0, 6).map((products: any, index: number) => {
        console.log("Product ID:", product.id);
        return (
          <div
            key={product.id} // Ensure key is unique and assigned to Link
            className={`${index === 0 ? "" : "hidden md:block"}`}
          >
            <ProductItem product={product} />
          </div>
        );
      })}
    </>
  );
};

export default Products;
