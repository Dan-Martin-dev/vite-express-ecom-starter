  import { useEffect, useState } from "react";
  import type { Product } from "@/types/types";
  import { VITE_API_BASE_URL } from "@/utils/config";

  const useFetchSingleProduct = (id: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${VITE_API_BASE_URL}/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: { product: Product } = await response.json();
        setProduct(data.product);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProduct();
    } );
  
    return { product, loading, error, fetchProduct };
  };

  export default useFetchSingleProduct;
