import useFetchProducts from "@/hooks/useFetchProducts";
import { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { useParams, Link } from "@tanstack/react-router"; // <--- Import Link from tanstack
import slugify from "slugify"; // Assuming slugify is default export
import { Product } from "@/types/types"; // <--- !!! IMPORT YOUR PRODUCT TYPE !!! Adjust path as needed

// --- Helper Hooks (Implement or import these) ---
const useSelectedSize = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const handleClick = (size: string) => {
    setSelectedSize(size);
  };
  return { selectedSize, handleClick };
};

const useQuantity = (initialValue = 1) => {
  const [quantity, setQuantity] = useState(initialValue);
  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1)); // Prevent going below 1
  return [quantity, increaseQuantity, decreaseQuantity] as const; // Use 'as const' for better tuple typing
};
// --- End Helper Hooks ---

const ProductDetail = () => {
  // Error 1 Fix: Provide the 'from' option with your actual route ID
  // Replace '/products/$slug' with the correct ID if it's different
  const { slug } = useParams({ from: "/products/$slug" });

  const { products, loading: productsLoading } = useFetchProducts(); // Fetch all products

  // Error 2 Fix: Explicitly type the state with Product | null
  const [product, setProduct] = useState<Product | null>(null);

  // --- Re-integrate hooks from commented section ---
  const { selectedSize, handleClick } = useSelectedSize();
  const [quantity, increaseQuantity, decreaseQuantity] = useQuantity();
  // ---------------------------------------------

  useEffect(() => {
    // No error here, but consider fetching only the needed product by slug/id
    // This client-side find is inefficient for large product lists
    if (!productsLoading && products.length > 0 && slug) {
      const foundProduct = products.find(
        (p) => slugify(p.name, { lower: true, strict: true }) === slug // Ensure consistent slugification
      );
      setProduct(foundProduct || null); // This is now type-safe
    }
  }, [slug, products, productsLoading]); // Add productsLoading dependency

  // --- Fix Runtime Error: Define imageUrl based on the current 'product' state ---
  const imageUrl = product?.images?.[0] || "/logo.webp";
  // ----------------------------------------------------------------------------

  // Use the loading state from useFetchProducts
  if (productsLoading) return <p>Loading product list...</p>;
  // After list loads, check if the specific product was found
  if (!product) return <p>Product not found for slug: {slug}</p>;

  return (
    /* Product detail component */
    <div className="w-full min-h-max flex flex-col sm:flex-row sm:space-x-4">
      {/* image section */}
      <div className=" w-full sm:w-1/2">
        {/* counter/arrows */}
        <div className="flex justify-between mx-4 text-lg text-gray-500">
          {/* TODO: Implement image counter logic if needed */}
          <p>1/{product.images?.length || 1}</p>
          <div className="flex ">
            <MdArrowRightAlt
              className="transform rotate-180 text-gray-400 cursor-pointer" // Add cursor pointer if interactive
              size={27}
            />
            <MdArrowRightAlt className="text-gray-400 mx-2 cursor-pointer" size={27} />
          </div>
        </div>

        {/* carousel */}
        <div className="relative m-4">
          {/* Red Tag - TODO: Make dynamic based on product discount */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-2 py-1 z-0">
            -25% OFF
          </div>
          {/* image */}
          <img alt={product.name} src={imageUrl} /> {/* Use product name for alt text */}
        </div>
      </div>

      {/* description section */}
      <div className="w-full sm:w-1/2 mx-3">
        {/* links - Use TanStack Link */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2 mx-4">
          <Link to="/" className="hover:text-gray-600">
            Inicio
          </Link>
          <span className="text-gray-400">|</span>
          {/* TODO: Update link target based on product category/collection */}
          <Link to="/collections/new" className="hover:text-gray-600">
            NEW COLLECTION
          </Link>
          <span className="text-gray-400">|</span>
          {/* Current Product Name (Not a link usually) */}
          <span className="text-gray-800">{product.name}</span>
        </div>

        {/* product information */}
        <div className="">
           {/* title - Use product.name (assuming 'title' isn't a field) */}
          <h1 className="text-center text-4xl text-gray-500 mt-5 mb-5 ">
             {product.name}
          </h1>

          {/* prices */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-xl font-normal text-gray-500">
              ${product.price} {/* Ensure 'price' exists on Product type */}
            </span>
            {product.beforePrice && ( // Check if 'beforePrice' exists
              <span className="text-md font-normal text-gray-400 line-through">
                ${product.beforePrice}
              </span>
            )}
          </div>

          {/* share - Assuming 'share' is not a standard field, remove or adjust */}
          {/* <p className="text-xs text-red-600">{product.share}</p> */}

          {/* discount - TODO: Calculate dynamically */}
          <div className="flex my-2">
            <p className="text-xs text-red-600">25% de descuento</p>
            <p className="text-xs text-gray-500 ml-2">pagando en efectivo</p>
          </div>

          {/* details link - TODO: Implement details view/modal */}
          <button className="text-md text-gray-500 my-2 underline">
            Ver mas detalles
          </button>

          {/* size */}
          <div className="flex mt-4 items-center"> {/* Use items-center */}
             <p className="text-sm text-gray-500">Talle:</p>
             {/* Display selected size or placeholder */}
             <p className="text-sm text-gray-600 ml-2">{selectedSize || 'Selecciona un talle'}</p>
          </div>


          {/* size boxes - TODO: Use actual sizes from product variants if available */}
          <div className="flex space-x-4 my-4">
             {["talle 1", "talle 2", "talle 3", "talle 4"].map((size, index) => ( // Use actual product sizes
               <button // Use button for better accessibility
                 key={index}
                 className={`flex items-center text-slate-600 text-center justify-center align-middle text-xs w-14 h-8 border border-gray-500 hover:border-gray-400 focus-within:border-gray-500 transition-all ${
                   selectedSize === size ? "bg-slate-300 font-semibold" : "bg-transparent" // Add font-semibold for selection
                 }`}
                 onClick={() => handleClick(size)} // No need for extra function wrapper
               >
                 {size}
               </button>
             ))}
          </div>


          {/* cart button */}
          <div className="flex items-center justify-start mt-7 space-x-4"> {/* Use items-center and spacing */}

            {/* plus minus button - Uncommented and integrated */}
            <div className="flex border border-gray-300 rounded">
              <button
                className="px-3 py-2 text-gray-700 rounded-l hover:bg-gray-100 focus:outline-none" // Adjusted padding/style
                onClick={decreaseQuantity}
                aria-label="Decrease quantity" // Accessibility
              >
                -
              </button>
              {/* Use a span or div instead of input if not editable */}
              <span
                className="w-10 h-10 flex items-center justify-center text-center border-l border-r border-gray-300"
                aria-live="polite" // Accessibility
              >
                 {quantity}
              </span>
              <button
                className="px-3 py-2 text-gray-700 rounded-r hover:bg-gray-100 focus:outline-none" // Adjusted padding/style
                onClick={increaseQuantity}
                aria-label="Increase quantity" // Accessibility
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <div> {/* Removed justify-around from parent */}
              <button
                 className="py-3 px-10 sm:px-8 md:px-12 lg:px-16 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50" // Added focus/disabled styles
                 // TODO: Implement Add to Cart logic
                 onClick={() => console.log(`Adding ${quantity} of ${product.name} (Size: ${selectedSize}) to cart`)}
                 disabled={!selectedSize} // Disable if no size is selected
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;