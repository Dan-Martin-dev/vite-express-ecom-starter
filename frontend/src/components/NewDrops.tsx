import { ShopContext } from "@/context/ShopContext";
import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const NewDrops = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  console.log(products);

  return (
    <div className="h-screen md:grid grid-cols-1 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-4 p-4">
      {/* NUEVOS INGRESOS */}
      <div className="col-span-1 row-span-1 md:row-span-2 ">
        <h1 className="text-4xl md:text-4xl md:p-2 lg:text-6xl lg:p-5 font-normal text-gray-500 ">
          NEW DROPS
        </h1>
      </div>

      {/* Grid Items */}
      <div className="col-span-1 md:col-span-3 grid md:grid-cols-3 lg:grid-cols-3 gap-4">
        {latestProducts.slice(0, 6).map((products: any, index: number) => {
          return (
            <div
              key={products.id} // Ensure key is unique and assigned to Link
              className={`${index === 0 ? "" : "hidden md:block"}`}
            >
              <ProductItem product={products} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewDrops;
