import ProductItem from "@/components/features/products/ProductItem";
import type { Product } from "@/types/types";
import { useShop } from "@/context/ShopContext.tsx";
import useFetchProducts from "@/hooks/useFetchProducts.tsx";

const NewDrops = () => {
  const { currency, delivery_fee } = useShop();
  const { products, loading, error } = useFetchProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("Final Products State:", products);
  console.log("Type Check:", Array.isArray(products) ? "✅ Array" : "❌ Not an Array");

  return (
    <div className="md:grid grid-cols-1 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-4 p-4">
      
      <div className="col-span-1 row-span-1 md:row-span-2 ">
        <h1 className="text-4xl md:text-4xl md:p-2 lg:text-6xl lg:p-5 font-normal text-gray-500 ">
          NEW DROPS
        </h1>
      </div>

      <div className="col-span-1 md:col-span-3 grid md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.slice(0, 6).map((product: Product, index: number) => (
            <div
              key={product.id}
              className={`${index === 0 ? "" : "hidden md:block"}`}
            >
              <ProductItem
                product={product}
                currency={currency}
                delivery_fee={delivery_fee}
              />
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default NewDrops;
/*
import React, { useState } from "react";
import ProductItem from "../Products/ProductItem.tsx";
import type { Product } from "@/types/types";
import { useShop } from "@/context/ShopContext.tsx";
import useFetchProducts from "@/hooks/useFetchProducts.tsx";
import LoadingSkeleton from "../Common/LoadingSkeleton.tsx";

const NewDrops = () => {
  const { currency, delivery_fee } = useShop();
  const { products, loading, error } = useFetchProducts();
  const [visibleProducts, setVisibleProducts] = useState(6);

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="md:grid grid-cols-1 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-4 p-4">
      <div className="col-span-1 row-span-1 md:row-span-2">
        <h1 className="text-4xl md:text-4xl md:p-2 lg:text-6xl lg:p-5 font-normal text-gray-500" aria-label="New Drops">
          NEW DROPS
        </h1>
      </div>

      <div className="col-span-1 md:col-span-3 grid md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.slice(0, visibleProducts).map((product: Product, index: number) => (
            <div
              key={product.id}
              className={`${index === 0 ? "" : "hidden md:block"}`}
            >
              <ProductItem
                product={product}
                currency={currency}
                delivery_fee={delivery_fee}
              />
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {visibleProducts < products.length && (
        <button onClick={loadMore} className="bg-blue-500 text-white p-2 mt-4 col-span-full">
          Load More
        </button>
      )}
    </div>
  );
};

export default React.memo(NewDrops);
  */