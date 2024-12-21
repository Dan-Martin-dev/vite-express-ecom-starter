import { ShopContext } from "@/context/ShopContext";
import { useState, useEffect, useContext } from "react";

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
      <div className="ml-10">

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

          {/* Divider */}
          <span className="text-gray-400">|</span>

          {/* Link 3 */}
          <a className="hover:text-gray-600" href="#">
            Signature Summer Shirt
          </a>
        </div>

        {/* Title */}
        <div className="">
          <h1 className="align-middle text-center items-center text-4xl font-light text-stone-600 mt-4">
            NEW COLLECTION
          </h1>
        </div>

        {/* Description */}
        <div>
          <h2 className="mt-16 text-base text-gray-500">Endless Summer Collection, una colección pensada en la comodidad, versatilidad, calidad y utilidad de todas las prendas. </h2>
        </div>


      </div>

      {/* Collection */}

      

    </div>
  );
};

export default DynamicCollections;
