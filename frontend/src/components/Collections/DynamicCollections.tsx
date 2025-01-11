import { ShopContext } from "@/context/ShopContext";
import { useState, useEffect, useContext } from "react";
import ProductItem from "../Products/ProductItem";

const DynamicCollections = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleCategoryChange = (category:any) => {
    setSelectedCategory(category);
    setFilteredProducts(
      category
        ? products.filter((product) => product.category === category)
        : products
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

        {/* Filters */}
        <div className="w-screen">
          <div>

            {/* Filter Section */}
            <div className="hidden md:block bg-gray-100 p-4">
              <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      selectedCategory === ""
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleCategoryChange("")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      selectedCategory === "Clothing"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleCategoryChange("Clothing")}
                  >
                    Clothing
                  </button>
                </li>
                <li>
                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      selectedCategory === "Electronics"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleCategoryChange("Electronics")}
                  >
                    Electronics
                  </button>
                </li>
                <li>
                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      selectedCategory === "Accessories"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleCategoryChange("Accessories")}
                  >
                    Accessories
                  </button>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-4">
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
