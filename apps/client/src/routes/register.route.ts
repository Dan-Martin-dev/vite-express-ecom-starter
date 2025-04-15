import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root'
import Register from '@/pages/Register';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register
});