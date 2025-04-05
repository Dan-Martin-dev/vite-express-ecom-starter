import { createRoute } from '@tanstack/react-router';
import { Route } from './__root';
import Register from '@/pages/Register';

export const loginRoute = createRoute({
  getParentRoute: () => Route,
  path: '/login',
  component: Register,
  meta: () => ({
    title: 'Login',
    requiresAuth: false
  })
});