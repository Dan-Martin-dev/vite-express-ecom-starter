// src/lib/axios.ts
import axios from 'axios';
import { env } from 'process';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Axios Interceptors ---

// Request Interceptor: Add Auth Token if available
apiClient.interceptors.request.use(
    (config) => {
      // Get token from storage (we'll set this up in AuthProvider)
      const token = localStorage.getItem('authToken'); // Or sessionStorage
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response Interceptor: Handle common errors (optional but good practice)
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // Example: Handle 401 Unauthorized globally (e.g., force logout)
      if (error.response?.status === 401) {
        // Dispatch a logout event or redirect (handle carefully to avoid loops)
        console.error('Unauthorized access - 401');
        // Consider clearing local storage and redirecting to login
        // window.location.href = '/login'; // Can be abrupt
      }
      // Log errors or transform error structure if needed
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
  