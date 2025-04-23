// apps/client/src/providers/GlobalProvider.tsx
import React, { ReactNode } from 'react';

// Import all your individual providers
import { AuthProvider } from '@/features/auth/providers/AuthProvider';
import { CartProvider } from '@/features/cart/providers/CartProvider';
// Assuming you have a ShopProvider based on ShopContext.tsx
// Adjust the import path as necessary

// --- Import other potential global providers here ---
// Example: import { ThemeProvider } from './ThemeProvider';
// Example: import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Optional: If using React Query
// const queryClient = new QueryClient();

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    // --- Nest your providers here ---
    // The order can matter if one provider depends on another.
    // e.g., If ShopProvider needs AuthContext, AuthProvider must be outside ShopProvider.
    // A common order: ReactQuery -> Auth -> Theme -> Shop -> ...

    // <QueryClientProvider client={queryClient}> // Example: React Query
      <AuthProvider>
        <CartProvider>
          {/* <ThemeProvider> */}
            {/* Innermost provider renders the children */}
            {children}
          {/* </ThemeProvider> */}
          </CartProvider>
      </AuthProvider>
    // </QueryClientProvider>
  );
};