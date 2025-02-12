import { ReactNode } from "react";

/* PRODUCT TYPES */
export interface Product {

  id: number;
  name: string;
  description?: string;
  price: number;
  share: ReactNode;
  beforePrice: number;
  discount: number;
  categoryId?: number;
  subcategoryId?: number;
  subcategory?: Subcategory;
  category?: Category;
  images: Image[];
  variants: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductItemProps {
  product: Product;
  loading?: boolean;
  error?: string | null;
  currency?: string;
  delivery_fee?: number;
}

export interface ProductVariant {
  id: number;
  size: string; // E.g., "S", "M", "L", "XL"
  stock: number;
  productId: number;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: number;
  url: string;
  productId: number;
  product?: Product;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  products: Product[];
  subcategories: Subcategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subcategory {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  category?: Category;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}


/* USER TYPES
 */
export interface User {
  id: number;
  name: string;
  email: string;
  roles: Array<string>; // Array of strings to accommodate multiple roles
  createdAt: string; // or Date
  updatedAt: string; // or Date
}

export interface UseRegisterReturn {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isClient: boolean;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
}

export interface UseLoginReturn {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isClient: boolean;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  setIsClient: React.Dispatch<React.SetStateAction<boolean>>;
}

/* CONTEXT */

export interface ShopContextType {
  products: Product[];
  loading: boolean;
  delivery_fee: number;
  currency: string;
  error: string | null;
  fetchProducts: () => Promise<void>;
}
export interface ShopContextProviderProps {
  children: ReactNode;
}