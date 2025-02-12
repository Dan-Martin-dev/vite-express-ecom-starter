import { Link } from "react-router-dom";
import {  useState } from "react";
import { ProductItemProps } from "@/types/types";

const ProductItem2: React.FC<ProductItemProps> = ({ product, loading, error, currency, delivery_fee }) => { 
  const [hover, setHover] = useState(false);

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
        <h1>jola</h1>
        {product.images.length > 0 && (
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-40 object-cover rounded"
        />
      )}
    </div>

    </div>
  );
};

export default ProductItem2;
