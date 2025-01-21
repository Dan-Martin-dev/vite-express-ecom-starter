export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // or number if you want to handle it as a numeric value
  beforePrice: number; // or number if you want to handle it as a numeric value
  image: string[]; // Array of image paths or URLs
  createdAt: string; // or Date
  updatedAt: string; // or Date
  category: string; // Nested category object
  subCategory: string;
  date: number;
  sizes: string[];
  share: string;
  discount: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  createdAt: string; // or Date if you prefer to handle dates as Date objects
  updatedAt: string; // or Date if you prefer to handle dates as Date objects
}

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
