// components/ProductDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchSingleProduct from '@/hooks/useFetchSingleProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { slug } = useParams<{ slug: string }>(); // Extract the slug from the URL
  const { product, loading, error } = useFetchSingleProduct(slug || ''); // Fetch product data
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

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