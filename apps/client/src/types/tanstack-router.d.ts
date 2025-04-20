// src/types/tanstack-router.d.ts
import { AuthContextType } from '@/features/auth/types'; // Adjust path if needed

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof import('../router').router; // Use relative path to your router instance

    // Define router context type
    routerContext: {
      auth: AuthContextType | undefined; // Make it potentially undefined before provider is ready
    };
  }
}