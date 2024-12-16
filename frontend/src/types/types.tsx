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
	subCategory: string,
	date: number,
	sizes: string[];
}

export interface Category {
	id: number;
	title: string;
	description: string;s
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