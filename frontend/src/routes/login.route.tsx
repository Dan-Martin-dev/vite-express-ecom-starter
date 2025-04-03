import { createRoute } from '@tanstack/react-router';
import { Route } from './__root';
import Login from '@/pages/Login';

export const loginRoute = createRoute({
  getParentRoute: () => Route,
  path: '/login',
  component: Login,
  // Optional: Add route metadata
  meta: () => ({
    title: 'Login',
    requiresAuth: false
  })
});