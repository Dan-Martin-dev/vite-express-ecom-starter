import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root'
import Login from '@/pages/Login';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login
});