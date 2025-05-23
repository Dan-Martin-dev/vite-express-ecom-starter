import { Link } from '@tanstack/react-router';
import { useState } from "react";
import { ProductItemProps } from "@/types/types";
import { VITE_BASE_URL } from "@/utils/config";

const ProductItem: React.FC<ProductItemProps> = ({ product, currency }) => {
  const imageUrl = `${VITE_BASE_URL}/${product.images[0]?.url}`;
  const [hover, setHover] = useState(false);
  
  const slugify = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  
  console.log(`Imagen URL: ${imageUrl}`);
  
  return (
    <div className="max-w-full mt-4 min-h-max">
      {/* Product Image */}
      <div
        className="relative overflow-hidden bg-white shadow-lg"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        {/* Red Tag */}
        {product.discount && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-red-600 text-white text-[0.70rem] font-bold px-2 py-1 z-10">
            {product.discount}% OFF
          </div>
        )}
        {/* Product Images */}
        <Link to={`/products/${slugify(product.name)}`}>
          <div className="w-full max-h-full">
            <img
              alt={product.name}
              className={`transform transition-transform duration-500 ease-in-out ${
                hover ? "scale-110" : "scale-100"
              } w-full h-full object-cover`}
              src={imageUrl}
            />
          </div>
        </Link>
      </div>
      
      {/* Product Info */}
      <div key={product.id} className="mt-3">
        <h2 className="text-md font-semibold text-gray-600">{product.name}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-md font-normal text-gray-500">
            {currency}
            {Number(product.price).toFixed(2)}
          </span>
          {product.beforePrice && (
            <span className="text-xs text-gray-400 line-through">
              {currency}
              {product.beforePrice}
            </span>
          )}
        </div>
        <p className="text-xs text-red-500">{product.share}</p>
        {/* Link to product detail page */}
        <Link 
          to={`/products/${product.id}`} 
          className="mt-2 w-full text-gray-500 text-sm font-normal py-2 text-left underline"
          /* onClick={() => {
            setIsPopupVisible(true);
            addToCart(product);
          }} */
        >
          Comprar
        </Link>
        {/* Render ProductPopup when visible */}
        {/* {isPopupVisible && (
          <ProductPopup
            product={product}
            onClose={() => {
              setIsPopupVisible(false);
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default ProductItem;