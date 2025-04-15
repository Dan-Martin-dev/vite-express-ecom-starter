  import { useEffect, useState } from "react";
  import type { Product } from "@/types/types";
  import { VITE_API_BASE_URL } from "@/utils/config";

  const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${VITE_API_BASE_URL}/product/getall`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: { message: string; products: Product[] } = await response.json();        
        console.log("Parsed API Response:", data); // Log parsed response

        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    return { products, loading, error, fetchProducts };
  };

  export default useFetchProducts;
