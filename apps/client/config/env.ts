          
// src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:4000/api'; // Adjust port/path if needed

if (!API_BASE_URL) {
  console.warn('VITE_API_BASE_URL environment variable is not set. Using default.');
}

export const env = {
  apiBaseUrl: API_BASE_URL,
};

// Add to your .env file in the project root:
// VITE_API_BASE_URL=http://localhost:5000/api

    