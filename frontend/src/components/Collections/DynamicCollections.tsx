import { ShopContext } from "@/context/ShopContext";
import { useState, useEffect, useContext } from "react";
import ProductItem from "../Products/ProductItem";

const DynamicCollections = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  return (
    
    /* Container */
    <div className="">

      {/* Description */}
      <div className="ml-5 mb-16">
        {/* Links */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-6 ">
          {/* Link 1 */}
          <a className="hover:text-gray-600" href="#">
            Inicio
          </a>

          {/* Divider */}
          <span className="text-gray-400">|</span>

          {/* Link 2 */}
          <a className="hover:text-gray-600" href="#">
            NEW COLLECTION
          </a>

        </div>

        {/* Title */}
        <div className="">
          <h1 className="align-middle text-center items-center text-4xl font-normal text-neutral-500 mt-2">
            NEW COLLECTION
          </h1>
        </div>

        {/* Description */}
        <div className="flex items-center justify-center mr-2">
          <h2 className="align-middle justify-center mt-4 text-sm text-gray-500">
            Endless Summer Collection, una colección pensada en la comodidad,
            versatilidad, calidad y utilidad de todas las prendas.{" "}
          </h2>
        </div>
      </div>

      {/* Collection */}
      <div className="md:grid grid-cols-1 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-4 p-4">

        <div className="col-span-1 row-span-1 md:row-span-2 ">
          <div className="min-w-60">
            <p onClick={()=>setShowFilter(!showFilter)}></p>
          </div>
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-2 col-span-2 md:col-span-3  md:grid-cols-3 lg:grid-cols-3 gap-4">

          {products.slice(0, 6).map((product: unknown, index: number) => {
            return (
              <div
                key={product.id} // Ensure key is unique and assigned to Link
              >
                <ProductItem product={product} />
              </div>
            );
          })}

        </div>
          
      </div>

    </div>
  );
};

export default DynamicCollections;
