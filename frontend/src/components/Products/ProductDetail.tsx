// components/ProductDetail.tsx
import React from 'react';
import { useParams } from "@tanstack/react-router";
import { useFetchProduct } from '@/hooks/useFetchProduct';

const ProductDetail: React.FC = () => {
  const { id } = useParams({ from: "/products/$id" }); // Get ID from URL  const { slug } = useParams<{ slug: string }>(); // Extract the slug from the URL
  const { product, loading, error } = useFetchProduct(id);  


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      {/* Product Name */}
      <h1 className="text-xl font-bold">{product.name}</h1>

      {/* Product Image */}
      <div className="w-full max-h-full">
        <img
          alt={product.name}
          className="w-full h-full object-cover"
          src={product.images[0]?.url || 'default-image-url.jpg'} // Use the first image or a fallback
        />
      </div>

      {/* Product Description */}
      <p className="mt-2">{product.description}</p>

      {/* Product Price */}
      <p className="text-lg font-semibold">${product.price}</p>

      {/* Product Stock */}
      <p>Stock: {product.stock}</p>

      {/* Product Variants */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">Variants:</h2>
        <ul>
          {product.variants.map((variant) => (
            <li key={variant.id} className="mt-2">
              <p>Size: {variant.size}</p>
              <p>Stock: {variant.stock}</p>
              <p>Price: ${variant.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;