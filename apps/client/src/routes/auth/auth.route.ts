import { createRoute, redirect } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root'
import Login from '@/pages/LoginPage';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated', // Give it an ID
  // --- This is the core of route protection ---
  beforeLoad: ({ context, location }) => {
    // context.auth is injected when creating the router instance
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Pass the original location to redirect back after login
          redirect: location.href,
        },
        replace: true, // Replace the current history entry
      });
    }
    // If authenticated, proceed to load the route's component/loader
  },
  // You can add a pending component for all auth routes if desired
  // pendingComponent: () => <div>Loading authenticated section...</div>,
});
